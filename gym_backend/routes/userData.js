const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/config.json')
router.get('/userDetails', async (req, res) => {
  let branchCode=req.query.branch;
    const userData = await axios
    .get(config.userDetails)
    .then(response => {
        console.log(response.data);
        let data=response.data.filter(obj=>obj.branchCode==branchCode);
      
      //   data.map(obj=>{
      //     let joining=obj.joiningDate.split("T");
      //    obj.joiningDate.setDate(joining[0].getDate() + 1);
      //     let paid=obj.paidDate.split("T");
      //     obj.paidDate.setDate(paid[0].getDate() + 1);
      //   let due =obj.dueDate.split("T");
      //   obj.dueDate.setDate(due[0].getDate() + 1);
      // })
     // console.log(results[0], results.length);
    //  var result=results.filter(obj=>{
    //    const x2 = JSON.stringify(obj.Date);
    //        const z2=x2.slice(1,x2.length-1);
    //        const y2=z2.split("T");
    //          const resultDate=y2[0];
    //  //	console.log(resultDate, yesDate);
    //    if(resultDate===yesDate) return obj;
    //  });

        res.send(data);
    })
    .catch(error => {
      console.log('Error - getMe:', error)
    });
 
});
module.exports = router;
