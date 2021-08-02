const express = require('express');
require('dotenv').config()
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
var uniqid = require('uniqid');
const schedule = require('node-schedule');
router.post('/registerNewUser', async (req, res) => {
  let paidDate = ""
  if (req.body.subscription == "") {
    paidDate = getNotifiedDate(req.body.joiningDate, 'None')
  } else if (req.body.subscription == '3 Months') {
    paidDate = getNotifiedDate(req.body.joiningDate, '3 Months')
  } else if (req.body.subscription == '6 Months') {
    paidDate = getNotifiedDate(req.body.joiningDate, '6 Months')
  } else {
    paidDate = getNotifiedDate(req.body.joiningDate, '12 Months')
  }
  console.log("3", paidDate)
  let user = {
    sNo: uniqid(),
    userName: req.body.userName,
    number: req.body.number,
    joiningDate: req.body.joiningDate,
    paidDate: paidDate,
    dueDate: getNotifiedDate(paidDate, ""),
    status: req.body.status,
    branchCode: req.body.branchCode,
    subscription: req.body.subscription,
    amount: req.body.amount,
  }
  const userData = await axios
    .post(config.userRegistarion, user)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});
router.get('/checkDate', async (req, res) => {
  var yesterDayDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  console.log(yesterDayDate)
  const userData = await axios
    .get(config.userDetails)
    .then(response => {
      console.log(response.data)
      var notfiedUser = response.data.filter(data => data.dueDate == yesterDayDate);
      console.log(notfiedUser)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
});
const morningReminder = schedule.scheduleJob({ hour: 10, minute: 30 }, async () => {
  const todayDate = new Date();
  console.log(todayDate)
  var startDay = todayDate.getDate();
  var month = todayDate.getMonth();
  var year = todayDate.getFullYear();
  var alertDate = startDay + '/' + month + '/' + year;
  const userData = await axios
    .get(config.userDetails)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
})
const eveningReminder = schedule.scheduleJob({ hour: 22, minute: 06 }, async () => {
  var yesterDayDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  console.log(yesterDayDate)
  const userData = await axios
    .get(config.userDetails)
    .then(response => {
      console.log(response.data)
      var notfiedUser = response.data.filter(data => data.dueDate == yesterDayDate);
      console.log(notfiedUser)
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
})
function sendMessage(mobileNumber) {
  console.log(mobileNumber)
  let message = 'This is month end. This message is for remind you to pay gym fees.'
  let response = fast2sms.sendMessage({ authorization: process.env.FAST_2_SMS_SECRET_CODE, message: message, numbers: mobileNumber });
  console.log(response)
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
  var dd = someDate.getDate();
  var mm = someDate.getMonth() + 1;
  var y = someDate.getFullYear();

  return someFormattedDate = dd + '/' + mm + '/' + y;
}

module.exports = router;
