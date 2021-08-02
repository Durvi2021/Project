const express = require('express');
const axios = require('axios');
const router = express.Router();
import config from '../config/config.json'
router.post('/registerNewUser', async (req, res) => { 
    let user  = {
        userNamename:req.body.userName,
        number: req.body.number,
        joiningDate: getTodayDate(),
        paidDate: getTodayDate(),
        dueDate: getNotifiedDate(),
        status: req.body.status,
        branchCode: req.body.branchCode,
        subscription: req.body.subscription,
        amount: req.body.amount,
    }   
    const userData = await axios
    .post(config.userRegistarion,user)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});
function getTodayDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return  today = dd + '/' + mm + '/' + yyyy;
}
function getNotifiedDate(){
    var someDate = new Date();
    var numberOfDaysToAdd = 6;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    return someFormattedDate = dd + '/'+ mm + '/'+ y;
}
module.exports = router;
