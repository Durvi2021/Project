import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'
import config from "../config.json";
import ReactFormValidation from "react-form-input-validation";
import '../App.css';
class Showusers extends Component {
  constructor(props) {
    
    super(props);
   
     this.state = {
      showModal: false,
      userData: [],
      sendData:{},
      branchCode:this.props.match.params.branch,
      weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      details:this.props.location.state,
     }
}

 d = new Date();
 month = ("0"+ (this.d.getMonth()+1)).slice(-2);
 date = ("0"+ this.d.getDate()).slice(-2);
 day = this.d.getDay();
 dformat = [this.day,this.month, this.d.getFullYear(), this.date];
  
  componentDidMount() {
 this.getDetails();
  }
  async  getDetails(){
    console.log(this.state.branchCode)
    let url=config.userDetails+"?branch="+this.state.branchCode;
    const userData = await axios
    .get(url, { headers: { 'Authorization': this.state.token } })
  .then(resp=>resp.data)
  .catch(error => {
    if(error.response.status===403){
      alert("Your session has expired! Please Login again!")
      this.props.history.push(`/admin`);
    }
  });
  this.setState({userData:userData,sendData:userData[0]});
  console.log(this.state.userData);
  }

  async postData(sendData) {
    // let obj={
    //   sNo:sendData.sNo,
    //   userName:sendData.userName,
    //   mobileNumber: sendData.number,
    //   joiningDate:sendData.joiningDate,
    //   paidDate:sendData.paidDate,
    //   dueDate:sendData.dueDate,
    //   status: sendData.status,
    //   branchCode: sendData.branchCode,
    //   subscription: sendData.subscription,
    //   amount: sendData.amount,
    // }
    console.log();
    // const url= config.userEdit;
    // await axios.post(url, obj).then(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    
  }
  handleCloseShow() {
    this.setState({ showModal: false });
  }
  handleSubmitShow() {
    this.setState({ showModal: false });
  }
  
  showData(data) {
    this.setState({ showModal: true,sendData:data });
  }
async  editData(data) {
    await this.props.history.push({ 
      pathname: '/admin/editData',
      state: data
     });
  }
  render() {
    return (
      <div style={{ backgroundColor: "whitesmoke" }} className="container-fluid">
           <div style={{ padding: 5, marginBottom: 5 }}>
                  <h1 className="text-center letterFormate font-weight-bold">User Details</h1>
  <div className="table-responsive-sm">
 <table className="table">
  <thead>
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Joining Date</th>
      <th scope="col">Paid Date</th>
      <th scope="col">Due Date</th>
      <th scope="col">Subscription</th>
      <th scope="col">Amount</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {this.state.userData.map((data, index) => (   
    <tr>
      <th  scope="row" className="text-primary" onClick={() => this.showData(data)}>{data.userName}</th>
      <td>{data.mobileNumber}</td>
      <td>{data.joiningDate}</td>
      <td>{data.paidDate}</td>
       <td>{data.dueDate}</td>
      <td>{data.subscription}</td>
       <td>{data.amount}</td>
      <td>{data.status}</td>
      <td>   <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button></td>
    </tr> ))}
  </tbody>
</table>
   </div>            
    </div>
                <Modal show={this.state.showModal} onHide={() => this.handleCloseShow()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.state.sendData.userName} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form className="myForm" >
              <Form.Group>
                <Form.Label> Branch Code <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="branchCode"
                  disabled={true}
                  value={this.state.sendData.branchCode}
                  // To override the attribute name
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                <Form.Label> User Name <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={this.state.sendData.userName}
                  // To override the attribute name
                  data-attribute-name="" />
             
              </Form.Group>

              <Form.Group>
                <Form.Label> Mobile Number <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  value={this.state.sendData.mobileNumber}
                  // To override the attribute name
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Joining Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="joiningDate"
                  value={this.state.sendData.joiningDate}
                 
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Paid Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="paidDate"
                  value={this.state.sendData.paidDate}
                 
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Due Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="dueDate"
                  value={this.state.sendData.dueDate}
                 
                  data-attribute-name="" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Status <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={this.state.sendData.status}
                 
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                <Form.Label> Subscription <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="subscription"
                  value={this.state.sendData.subscription}
                 
                  data-attribute-name="" />
              </Form.Group>
              <Form.Group>
                <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  value={this.state.sendData.amount}
                 
                  data-attribute-name="" />
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleSubmitShow()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        </div>
      
    );
  }
}
export default Showusers;