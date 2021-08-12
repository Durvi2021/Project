const express = require('express');
require('dotenv').config()
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
var uniqid = require('uniqid');
const schedule = require('node-schedule');
router.put('/editRegisteredUser', async (req, res) => {   
  console.log("data",req.body);
    let user  = {
      sNo:req.body.sNo,
        userName:req.body.userName,
        mobileNumber: req.body.mobileNumber,
        joiningDate:req.body.joiningDate,
        paidDate:req.body.paidDate,
        dueDate:req.body.dueDate,
        status: req.body.status,
        branchCode: req.body.branchCode,
        subscription: req.body.subscription,
        amount: req.body.amount
    }   
    await axios
    .post(config.userEdit,user)
    .then(response => {
      // console.log(response.data)
      res.send("Success");
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});

module.exports = router;
