const express = require('express');
require('dotenv').config()
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
var uniqid = require('uniqid');
const schedule = require('node-schedule');
router.put('/editRegisteredUser', async (req, res) => {   
    let user  = {
        userName:req.body.userName,
        number: req.body.number,
        status: req.body.status,
        branchCode: req.body.branchCode,
        subscription: req.body.subscription,
        amount: req.body.amount,
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
