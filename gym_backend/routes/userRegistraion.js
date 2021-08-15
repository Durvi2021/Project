const express = require('express');
require('dotenv').config()
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
var uniqid = require('uniqid');
const schedule = require('node-schedule');
router.post('/registerNewUser', async (req, res) => {
  console.log(req.body.subscription);
  let paidDate = ""
  if (req.body.subscription=="undefiend") {
    paidDate = req.body.joiningDate;//getNotifiedDate(req.body.joiningDate, "");
    console.log(paidDate);
  } else if (req.body.subscription == '3 Months') {
    paidDate = getNotifiedDate(req.body.joiningDate, '3 Months')
  } else if (req.body.subscription == '6 Months') {
    paidDate = getNotifiedDate(req.body.joiningDate, '6 Months')
  } else {
    paidDate = getNotifiedDate(req.body.joiningDate, '12 Months')
  }
  //console.log("3", paidDate)
  let id = Math.random().toString(36).substr(2, 4);
  //console.log(id);
  let user = {
    sNo: id,
    userName: req.body.userName,
    mobileNumber: req.body.mobileNumber,
    joiningDate: req.body.joiningDate,
    paidDate: paidDate,
    dueDate: getNotifiedDate(paidDate, ""),
    status: "Active",
    branchCode: req.body.branchCode,
    subscription: req.body.subscription,
    amount: req.body.amount,
  }
  //console.log(user,config.userRegistraion)
  const userData = await axios
    .post(config.userRegistraion, user)
    .then(response => {
      //console.log("datareppose",response.data,"lklk");
     // console.log(response);
      res.send("Success");
    })
    .catch(error => {
      console.log('Error - getMe1:', error)
    });
});
router.get('/checkDate', async (req, res) => {
  var yesterDayDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  //console.log(yesterDayDate)
  const userData = await axios
    .get(config.userDetails)
    .then(response => {
      //console.log(response.data)
      var notfiedUser = response.data.filter(data => data.dueDate == yesterDayDate);
      //console.log(notfiedUser)
    })
    .catch(error => {
      //console.log('Error - getMe:', error)
    });
});
const morningReminder = schedule.scheduleJob({ hour: 10, minute: 30 }, async () => {
  const todayDate = new Date();
  //console.log(todayDate)
  var startDay =  ("0"+ todayDate.getDate()).slice(-2);
  var month =("0"+ (todayDate.getMonth()+1)).slice(-2);
  var year = todayDate.getFullYear();
  var alertDate = year+"-"+month+"-"+startDay;
  const userData = await axios
    .get(config.userDetails)
    .then(response => {
      //console.log(response.data)
    })
    .catch(error => {
      //console.log('Error - getMe:', error)
    });
})
const eveningReminder = schedule.scheduleJob({ hour: 22, minute: 06 }, async () => {
  var yesterDayDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  //console.log(yesterDayDate)
  const userData = await axios
    .get(config.userDetails)
    .then(response => {
      //console.log(response.data)
      var notfiedUser = response.data.filter(data => data.dueDate == yesterDayDate);
      //console.log(notfiedUser)
    })
    .catch(error => {
      //console.log('Error - getMe:', error)
    });
})
function sendMessage(mobileNumber) {
  //console.log(mobileNumber)
  let message = 'This is month end. This message is for remind you to pay gym fees.'
  let response = fast2sms.sendMessage({ authorization: process.env.FAST_2_SMS_SECRET_CODE, message: message, numbers: mobileNumber });
  //console.log(response)
  return response;
}
function getNotifiedDate(date, subscription) {
  var numberOfDaysToAdd;
  if (subscription == '3 Months') {
    numberOfDaysToAdd = 85;
  } else if (subscription == '6 Months') {
    numberOfDaysToAdd = 170
  } else if (subscription == '12 Months') {
    numberOfDaysToAdd = 365
  } else {
    numberOfDaysToAdd = 29
  }
  var someDate = new Date(`${date}`);
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  var mm = ("0"+ (someDate.getMonth()+1)).slice(-2);
   var dd = ("0"+ someDate.getDate()).slice(-2);
  var y=someDate.getFullYear();
  return someFormattedDate = y+"-"+mm+"-"+dd;
}

module.exports = router;
