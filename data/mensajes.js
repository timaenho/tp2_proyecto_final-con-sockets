const getConnection = require( './connection.js')
const DB_PROYECTO_FINAL = "tp2_proyecto_final"
const COLLECTION_MENSAJES = "mensajes_api"

async function addMessages (mensajes){
    console.log(mensajes)
    if(mensajes.selfUser === undefined || mensajes.otherUser === undefined){
        throw new Error ("Array no valido")
    }
    const clientMongo = await getConnection.getConnection()
    const result = clientMongo.db(DB_PROYECTO_FINAL)
                              .collection(COLLECTION_MENSAJES)  
                              .insertOne(mensajes)
    return result
}

async function getMessages () {
    console.log("entramos")
    const clientMongo = await getConnection.getConnection();
    const mensajes = clientMongo.db(DB_PROYECTO_FINAL)
                .collection(COLLECTION_MENSAJES)
                .find()
                .toArray()
    return mensajes
}

async function getMessagesUser (participantes) {
    if(participantes.selfUser === undefined || participantes.otherUser === undefined){
        throw new Error ("Participantes no son validos")
    }
    console.log(participantes.selfUser)
    const clientMongo = await getConnection.getConnection();
    
    const mensajes = clientMongo.db(DB_PROYECTO_FINAL)
                                .collection(COLLECTION_MENSAJES)
                                .find({selfUser : participantes.selfUser, 
                                    otherUser : participantes.otherUser})
                                    .toArray()
    
                              
    return mensajes
}



module.exports = 
{   
    addMessages,
    getMessages,
    getMessagesUser
    

}
