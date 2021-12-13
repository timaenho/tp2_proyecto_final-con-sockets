var express = require('express');
const { route } = require('.');
const { routes } = require('../app');
var router = express.Router();
const data = require('../data/usuarios') 
const auth = require('../middleware/auth')

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

router.get('/',async(req,res)=>{
  const result = await data.getUsuarios();
  res.send(result)
})

router.post('/signup', async (req,res)=>{
  const result = await data.addUser(req.body);
  res.send(result);
})

router.post('/login', async(req,res)=>{
  try{
      const user = await data.findByCredentials(req.body.email, req.body.password)
      const token = await data.generateAuthToken(user)
      res.send({user, token})

  }catch (error){
      res.status(401).send(error.message)
  }
})

router.post('/login/google', async(req,res)=>{
  try {
    console.log(req.body)
    let email = req.body.email
    let user = await data.getUsuarioByMail(email)
    console.log(user)
    if(!user){
      user = await data.addUserGoogle(req.body)
    }
    const token = await data.generateAuthToken(user)
    res.send({user, token})
  } catch (error) {
    res.status(401).send(error.message)
  } 
})

 router.put('/:id', async(req,res)=> {
  console.log("entro")
  let usuario = {...req.body,_id:req.params.id}
  console.log(usuario)
  let userUpdated = await data.updateUsuario(usuario)
  res.send(userUpdated)
})


module.exports = router;
