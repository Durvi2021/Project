import React, { Component } from 'react';
import axios from 'axios';

//import config from "../config.json";
//import http from "../services/auth"
class Showusers extends Component {
  constructor(props) {
    super(props);
     this.state = {
      userData: [232,23,2332,2323,23,23,2332,323],
      clCode: "",
      cl:"",
      rmCode: "",
      clStatus:"",
      weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      page: 0,
      leftMorningForm:[],
      leftEveningForm:[],
      status:false
    }
    console.log(this.state.status);
   
  }
 d = new Date();
 month = ("0"+ (this.d.getMonth()+1)).slice(-2);
 date = ("0"+ this.d.getDate()).slice(-2);
 day = this.d.getDay();
  dformat = [this.day,this.month, this.d.getFullYear(), this.date];
  
  componentDidMount() {
 
  }
 
 
  render() {
    return (
      <div style={{ backgroundColor: "#F8C47180" }} className="container-fluid">
           <div style={{ padding: 5, marginBottom: 5 }}>
                  <h5 className="text-center">User Details</h5>
              <div className="row ">
                  <div className="col-10 offset-1 bg-light ">
                  <div className="row border ">
                    <div className="col form-control">S. No.</div>
                    <div className="col form-control">User Name</div>
                    <div className="col form-control">Mobile Number</div>
                    <div className="col form-control">Joining Date</div>
                    <div className="col form-control">Paid Date</div>
                    <div className="col form-control">Due Date</div>
                    {/* <div className="col">Submit Payment</div> */}
                    <div className="col form-control">Status</div>
                </div>
                {this.state.userData.map((data, index) => (   
               <div className="row border ">
                    <div className="col form-control">{data}</div>
                    <div className="col form-control">{data}</div>
                    <div className="col form-control">{data}</div>
                    <div className="col form-control">{data}</div>
                    <div className="col form-control">{data}</div>
                    <div className="col form-control">{data}</div>
                    <div className="col form-control">{data}</div>
                </div>
               ))}
                  </div>
              </div>
                </div>

        </div>
      
    );
  }
}
export default Showusers;