import React from "react";
import ReactFormValidation from "react-form-input-validation";
import Form  from 'react-bootstrap/Form';
import axios from 'axios';
//import config from "../config.json";

class Loginpage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        token:"",
      fields: {
        userName: "",
        password:"",
      
      },
      errors: {}
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      userName:"required",
      password:"required",
     
     });

    this.form.onformsubmit = (fields) => {
     this.postData(fields);
     console.log(fields);
    }
  }
  async postData(fields){
    //const url= config.absentApi;
     let obj = {
      userName: fields.userName,
      password : fields.password
         };
console.log(obj);
    // await axios.post(url, obj).then(
    //   (response) => {
    //     console.log(response);
    //     alert("Abset form respone succesfully");
    //   //  var query=localStorage.getItem("query");
    //     this.props.history.push("/dashboard/"+fields.cl_code+"/"+fields.rm_code);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
    render() { 
        return (
          <div style={{backgroundColor:"#F8C47180",}} className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 offset-lg-2 offset-md-2">

                  <div className="row " style={{margin:1}}>
                 
                  <div  className="col-12 font-weight-bold text-center p-4">
                  <h1 className="letterFormate">Welcome To Admin Login </h1></div>
                  </div>
                    
                  <div className="row   mb-5 mt-4">
                 <div className="col-6 offset-3 bg-light">
                 <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
                  <Form.Group className="mt-4">
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
                  <Form.Group className="mt-4">
                  <Form.Label>Password <i className="text-danger">*</i> </Form.Label>
                 <Form.Control
                  type="text"
                  name="password"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.password}
                  // To override the attribute name
                  data-attribute-name="" />
                  <div className="alert-danger text-danger">
                  {this.state.errors.password
                  ? this.state.errors.password
                  : ""}
                  </div>
                  </Form.Group>
                
                  <button type="submit" className="btn btn-primary my-4">Submit</button>
                  </Form>
                 </div>
              </div>
              </div>
            </div>
          </div>
          
         );
    }
}

export default Loginpage;