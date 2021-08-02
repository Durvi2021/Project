const express = require('express');
const axios = require('axios');
const router = express.Router();
var uniqid = require('uniqid');
const config = require('../config/config.json')
router.post('/registerNewBranch', async (req, res) => { 
    console.log('working',req.body);

    let branch  = {
        sno:uniqid(),      
        todayDate:req.body.todayDate,
        userName:req.body.userName,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        role: req.body.role,
        branchCode:'B'+uniqid(),
        address: req.body.address,
    }
    const userData = await axios
    .post(config.branchRegistraion,branch)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});
module.exports = router;
