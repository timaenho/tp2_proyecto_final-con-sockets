var express = require('express');
const { route } = require('.');
const { routes } = require('../app');
var router = express.Router();
const data = require('../data/usuarios') 


router.post('/', async (req,res)=>{
    try {
        let selfUser = await data.getUserById(req.body.selfUser)
        let otherUser = await data.getUserById(req.body.otherUser)
        if(selfUser.friendlist === undefined){
            selfUser.friendlist = []
        }
        selfUser.friendlist.push({username: otherUser.username, id: otherUser._id})
        const result = await data.updateUsuario(selfUser)
        res.send(result);
    } catch (error) {
        res.status(401).send(error.message)
    }
  })

  router.delete('/', async (req,res) =>{
      try {
        let selfUser = await data.getUserById(req.body.selfUser)
        let index = selfUser.friendlist.indexOf(friend => friend.id == req.body.otherUser)
        console.log(index)
        const removed = selfUser.friendlist.splice(index,1)
        const result = await data.updateUsuario(selfUser)
        res.send(result);      
      } catch (error) {
        res.status(401).send(error.message)
      }
  })


  router.get('/:id', async (req,res)=>{
    let id = req.params.id
    console.log(id)
    let user = await data.getUserById(id)
    console.log(user)
    let friendlist = user.friendlist
    res.send(friendlist)
    // con sockets
 })

module.exports = router;