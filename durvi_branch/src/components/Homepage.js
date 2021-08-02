import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'
import ReactFormValidation from "react-form-input-validation";
//import config from "../config.json";
//import http from "../services/auth"
class Homepage extends Component {
  todate = new Date();
  month = ("0" + (this.todate.getMonth() + 1)).slice(-2);
  date = ("0" + this.todate.getDate()).slice(-2);
  day = this.todate.getDay();
  formatedDate = `${this.todate.getFullYear()}-${this.month}-${this.date}`;
  constructor(props) {
    super(props);

    this.state = {
      userData: [232, 23, 2332, 2323, 23, 23, 2332, 323],
      weekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      editModal: false,
      paymentModal: false,
      sendData: {},
      fields: {
        paymentDate: this.formatedDate,
        amount: 0,
        mobileNumber: "",
        userName: "",
      },
      errors: {}
    };
    //  console.log(this.state.fields.paymentDate);
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      userName: "required",
      mobileNumber: "required|numeric|digits:10",
      paymentDate: "required",
      amount: "required|numeric|"
    });

    this.form.onformsubmit = (fields) => {
      //this.postData(fields);
      console.log(fields);
    }
  }


  componentDidMount() {

  }
  async postData(fields) {
    //const url= config.absentApi;
    if (this.state.editModal) {
      let obj = {
        userName: fields.userName,
        mobileNumber: fields.mobileNumber,
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
    if (this.state.paymentModal) {
      let obj = {
        paymentDate: fields.paymentDate,
        userName: fields.userName,
        mobileNumber: fields.mobileNumber,
        amount: fields.amount
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
  }


  editData(data) {
    this.setState({ editModal: true, sendData: data });
    console.log(this.state.editModal);
  }
  handleCloseEdit() {
    this.setState({ editModal: false });
  }
  handleSubmitEdit() {

    this.setState({ editModal: false });
  }
  submitPayment(data) {
    this.setState({ paymentModal: true, sendData: data });
  }
  handleClosePayment() {
    this.setState({ paymentModal: false });
  }
  handleSubmitPayment() {
    this.setState({ paymentModal: false });
  }
  render() {
    return (
      <div style={{ backgroundColor: "#F8C47180" }} className="container-fluid">
        <div style={{ padding: 5, marginBottom: 5 }}>
          <h5 className="text-center" style={{ fontSize: 20, fontWeight: 'bold' }}>User's Details</h5>
          <div className="row" style={{ fontSize: 20, fontWeight: 'bold' }}>
            <div className="col-6 text-center">{this.state.weekDay[this.day]} </div>
            <div className="col-6 text-center">{this.formatedDate} </div>
          </div>
          <hr />
          <div className="row ">
            <div className="col-10 offset-1 bg-light ">
              <div className="row border ">
                <div className="col form-control">S. No.</div>
                <div className="col form-control">User Name</div>
                <div className="col form-control">Mobile Number</div>
                <div className="col form-control">Joining Date</div>
                <div className="col form-control">Paid Date</div>
                <div className="col form-control">Amount</div>
                <div className="col form-control">Due Date</div>
                {/* <div className="col form-control">Payment Date</div> */}
                <div className="col form-control">Submit Payment</div>
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
                  <div className="col form-control">
                    <Button className="btn btn-primary" onClick={() => this.submitPayment(data)}>Click here</Button>
                  </div>
                  <div className="col form-control">
                    <Button className="btn btn-primary" onClick={() => this.editData(data)}>Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal show={this.state.editModal} onHide={() => this.handleCloseEdit()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
              <Form.Group>
                <Form.Label> Branch Code <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="branchCode"
                  disabled={true}
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
                <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.mobileNumber}
                  disabled={true}
                  data-attribute-name="" />
                <div className="alert-danger text-danger">
                  {this.state.errors.amount
                    ? this.state.errors.amount
                    : ""}
                </div>
              </Form.Group>
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleSubmitEdit()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={this.state.paymentModal} onHide={() => this.handleClosePayment()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Submit Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="myForm" noValidate onSubmit={this.form.handleSubmit} >
              <Form.Group>
                <Form.Label> Date <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="date"
                  name="paymentDate"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.paymentDate}
                  // To override the attribute name
                  data-attribute-name="" />
                <div className="alert-danger text-danger">
                  {this.state.errors.paymentDate
                    ? this.state.errors.paymentDate
                    : ""}
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label> Branch Code <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="branchCode"
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                <Form.Label> Amount <i className="text-danger">*</i> </Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.mobileNumber}
                  data-attribute-name="" />
                <div className="alert-danger text-danger">
                  {this.state.errors.amount
                    ? this.state.errors.amount
                    : ""}
                </div>
              </Form.Group>
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleSubmitPayment()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}
export default Homepage;