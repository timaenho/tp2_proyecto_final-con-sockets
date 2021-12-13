const getConnection = require( './connection.js')
const ObjectId = require('bson').ObjectID
const bcrypt = require("bcryptjs")
require('dotenv').config()
var jwt = require("jsonwebtoken")

// video 05/10

const DB_PROYECTO_FINAL = "tp2_proyecto_final"
const COLLECTION_USUARIOS = "usuarios_api"


async function getUsuarios () {
    const clientMongo = await getConnection.getConnection();
    const usuarios = clientMongo.db(DB_PROYECTO_FINAL)
                .collection(COLLECTION_USUARIOS)
                .find()
                .toArray()
    return usuarios
}

async function getUsuarioByMail (_email) {
    const clientMongo = await getConnection.getConnection();
    let usuario =  clientMongo
        .db(DB_PROYECTO_FINAL)
        .collection(COLLECTION_USUARIOS)
        .findOne({email: _email })
  
   return usuario
} 

async function getUserById (id){
    const clientMongo = await getConnection.getConnection();
    const query = {_id: new ObjectId(id)}
    let usuario =  clientMongo
        .db(DB_PROYECTO_FINAL)
        .collection(COLLECTION_USUARIOS)
        .findOne(query)
  console.log(usuario)
   return usuario
}

async function addUser(user){
  const clientMongo = await getConnection.getConnection()
  user.password = await bcrypt.hash(user.password, 8)
  
  const result = clientMongo.db(DB_PROYECTO_FINAL)
                            .collection(COLLECTION_USUARIOS)
                            .insertOne(user)
            return result;    
}

async function addUserGoogle (user){
    const clientMongo = await getConnection.getConnection()
    const result = clientMongo.db(DB_PROYECTO_FINAL)
                              .collection(COLLECTION_USUARIOS)
                              .insertOne(user)
              return result;   
}


async function updateUsuario (usuario){
    const clientMongo = await getConnection.getConnection();
    const query = {_id: new ObjectId(usuario._id)}
    const nuevosValores = {
        $set: 
        {
        username: usuario.username,
        idiomaAaprender: usuario.idiomaAaprender,
        idiomaNativo: usuario.idiomaNativo,
        friendlist: usuario.friendlist
    }
    }
    const result = await clientMongo
        .db(DB_PROYECTO_FINAL)
        .collection(COLLECTION_USUARIOS)
        .updateOne(query,nuevosValores)
    // con objectID
    return result
}


async function findByCredentials (email, password){
    const clientMongo = await getConnection.getConnection()
    const user = await clientMongo
                            .db(DB_PROYECTO_FINAL)
                            .collection(COLLECTION_USUARIOS)
                            .findOne({email: email})
    if(!user){
        throw new Error('Credentiales no validas')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Credentiales no validas')
    }

    return user;
}



async function generateAuthToken(user) {
    const token = jwt.sign({_id:user._id}, process.env.SECRET, {expiresIn:'2h'})
    return token
}



module.exports = 
{   getUsuarios,
    updateUsuario,
    addUser,
    addUserGoogle,
    generateAuthToken,
    findByCredentials,
    getUsuarioByMail,
    getUserById
}