import React from "react";
import ReactFormValidation from "react-form-input-validation";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import config from "../config.json";
//import http from "../services/auth"
class Adduser extends React.Component {
  
  constructor(props) {
    super(props);
    var todate = new Date();
    var month = ("0"+ (todate.getMonth()+1)).slice(-2);
   var  date = ("0"+ todate.getDate()).slice(-2);
    var formatedDate = `${todate.getFullYear()}-${month}-${date}`;//`${date}-${month}-${todate.getFullYear()}`;


   
    this.state = {
      optionRadio:["3 Months","6 Months", "1 Year"],
      fields: {
        joiningDate: formatedDate,
       branchCode:this.props.match.params.branch,
       userName:"",
       mobileNumber:"",
       amount:"",
      subscription:"undefiend"
      },
      errors: {}
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
     joiningDate:"required",
      branchCode:"required",
     userName:"required",
     branchAddress:"required",
     mobileNumber: "required|numeric|digits:10",
     amount:"required|numeric",
     subscription:"required"
     });

    this.form.onformsubmit = (fields) => {
     this.postData(fields);
     console.log(fields);
    }
  }
  async postData(fields){
    const url= config.registerNewUser;
     let obj = {
        joiningDate:fields.joiningDate,
        branchCode:fields.branchCode,
       userName:fields.userName,
       mobileNumber: fields.mobileNumber,
       subscription:fields.subscription,
       amount:fields.amount
         };
console.log(obj);
    await axios.post(url, obj).then(
      (response) => {
        console.log(response);
        this.props.history.push("/branch/home/"+this.props.match.params.branch);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleRadio(e){
    console.log(e, this);
  }
    render() { 
        return (
          <div style={{backgroundColor:"#F8C47180"}} className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 offset-lg-2 offset-md-2">

                  <div className="row " style={{margin:1}}>
                 
                  <div  className="col-12 font-weight-bold text-center  p-4">
                  <h1 className="letterFormate">Add New User Form</h1></div>
                  </div>
                    
                  <div className="bg-light p-5 mb-3">
                  <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
                  <Form.Group>
                  <Form.Label> Date <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="date"
                  name="joiningDate"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.joiningDate}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.joiningDate
                  ? this.state.errors.joiningDate
                  : ""}
                  </div>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> Branch Code <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="branchCode"
                 
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.branchCode}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.branchCode
                  ? this.state.errors.branchCode
                  : ""}
                  </div>
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> User Name <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="userName"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.userName}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.userName
                  ? this.state.errors.userName
                  : ""}
                  </div>
                  </Form.Group>
                
                  <Form.Group>
                  <Form.Label> Mobile Number <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="mobileNumber"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.mobileNumber}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.mobileNumber
                  ? this.state.errors.mobileNumber
                  : ""}
                  </div>
                  </Form.Group>
                 
                  <Form.Group>
                    <Form.Label >Subscription <i className="text-danger">*</i></Form.Label>
                       { this.state.optionRadio.map((data,index)=>( <Form.Check  type="radio" key={index} className="p-1"
                          name="subscription"
                          onChange={this.form.handleChangeEvent} value={data}  id={data}
                          label={data} custom />))} 
                  </Form.Group>
                  <Form.Group>
                  <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="amount"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.amount}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.amount
                  ? this.state.errors.amount
                  : ""}
                  </div>
                  </Form.Group>
                  <button type="submit" className="btn btn-primary mt-3">Submit</button>
                  </Form>
              </div>
              </div>
            </div>
          </div>
          
         );
    }
}

export default Adduser;