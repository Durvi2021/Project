const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
router.post('/login', async (req, res) => {
    let loginUserData = {userName:req.body.userName, password:req.body.password};

    const userData = await axios
    .get(config.loginURL)
    .then(response => {
      let matchUser = response.data.find((user)=> user.userName == loginUserData.userName && user.password == loginUserData.password );
      console.log(matchUser)
      if(matchUser){
        console.log('Login succes')
      }else{
        console.log('Wrong user name or password')
      }
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});
module.exports = router;
