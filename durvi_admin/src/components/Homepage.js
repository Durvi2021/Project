import React, { Component } from 'react';
import axios from 'axios';

//import config from "../config.json";
//import http from "../services/auth"
class Homepage extends Component {
  constructor(props) {
    super(props);
  
     this.state = {
      userData: [1,3,565,7565],
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
   todate = new Date();
   month = ("0"+ (this.todate.getMonth()+1)).slice(-2);
    date = ("0"+ this.todate.getDate()).slice(-2);
     day = this.todate.getDay();
   formatedDate = `${this.todate.getFullYear()}-${this.month}-${this.date}`;
  
  componentDidMount() {
 
  }
async   showDetails(data){
    await this.props.history.push({ 
      pathname: '/admin/showusers',
      state: data
     });
  }
 
  render() {
    return (
      <div style={{ backgroundColor: "#F8C47180" }} className="container-fluid">
        <div className="row">
            <div className="col-6 offset-3">
            <div style={{ padding: 5, marginBottom: 5 }}>
                  <h5 className="text-center" style={{ fontSize: 20, fontWeight: 'bold' }}>Branche's Details</h5>
                  <div className="row" style={{ fontSize: 20, fontWeight: 'bold' }}>
                  <div className="col-6 text-center">{this.state.weekDay[this.day]} </div>
                  <div className="col-6 text-center">{this.formatedDate} </div>
                  </div>
                  <hr/>
                  {this.state.userData.map((data, index) => ( 
                    <table className="table table-info" key={index}>
                    <thead >
                      <tr >
                        <td>Branch Code</td>
                        <td className="text-center">{data}</td>
                      </tr>
                    </thead>
                    <tbody>
                    <tr >
                        <td>Name</td>
                        <td className="text-center">{data}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number</td>
                        <td className="text-center">{data}</td>

                      </tr>
                      <tr>
                        <td>Total User</td>
                        <td className="text-center">{data}</td>

                      </tr>
                      <tr>
                        <td>Location</td>
                        <td className="text-center">{data}</td>

                      </tr>
                      <tr>
                        <td>Show all user</td>
                        <td className="text-center"><button className="btn btn-primary" onClick={()=>this.showDetails(data)}>Show User</button></td>
                      </tr>
                    </tbody>
                  </table>
                  ))}
                </div>
            </div>
        </div>

        </div>
      
    );
  }
}
export default Homepage;