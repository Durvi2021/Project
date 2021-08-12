const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
router.post('/login', async (req, res) => {
    let loginUserData = {userName:req.body.userName, password:req.body.password};

    const userData = await axios
    .get(config.loginURL)
    .then(response => {
      console.log(response.data)
      let matchUser = response.data.find((user)=> user.branchCode == loginUserData.userName && user.password == loginUserData.password );
      console.log("matchuser",matchUser)
      if(matchUser){
        res.send(matchUser);
        console.log('Login succes')
      }else{
        res.send("wrong credential");
        console.log('Wrong user name or password')
      }
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});
module.exports = router;
