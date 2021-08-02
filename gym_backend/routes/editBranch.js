const express = require('express');
require('dotenv').config()
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
var uniqid = require('uniqid');
const schedule = require('node-schedule');
router.put('/editRegisteredBranch', async (req, res) => {   
    let branch  = {
        userName:req.body.userName,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        role: req.body.role,
        branchCode:'B'+uniqid(),
        address: req.body.address,
    }  
    const userData = await axios
    .put(config.userRegistarion,user)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});

module.exports = router;
