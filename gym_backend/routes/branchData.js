const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
router.get('/branchDetails', async (req, res) => {
    let branchData =[];
    let userData = [];
    await axios
    .get(config.userDetails)
    .then(response => {
      userData=response.data;
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });

    await axios
    .get(config.branchDetails)
    .then(response => {
        branchData=response.data;
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
    console.log(branchData);
    for(let i=0;i<branchData.length;i++){
        let countUser=[];
     countUser=userData.filter(obj=>obj.branchCode==branchData[i].branchCode);
        branchData[i].totalUser=countUser.length;
    }
    res.send(branchData);
});
module.exports = router;
