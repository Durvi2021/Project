import React, { Component } from 'react';
import Homepage from './Homepage';
import axios from 'axios';
import Loginpage from './Loginpage';
import Addbranch from './Addbranch';
import Showusers from './Showusers'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
//import config from "../config.json";
class AppNavbar extends Component {
    constructor(props) {
        super(props);
         this.state = {
             clcode:"",
             rmcode:"",
             status:true,
         }
       
      }
     async componentDidMount(){
       
      }
    render() {
        return (
            <Router>
            <Navbar bg="dark" expand="lg" variant="dark">

     <Navbar.Brand href="/admin/home"><img src="https://i.ibb.co/9WZ0LBd/DURVI-FITNESS.jpg" height={50} width={60} style={{"border-radius":"50%"}}/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
   {this.state.status?<> <Nav className="me-auto">
      <Nav.Link href="/admin/home">Home</Nav.Link>
        <Nav.Link href="/admin/addbranch">Add New Branch</Nav.Link>
      </Nav>
      <Nav className="mr-auto">
      <Nav.Link href="/admin/login">Logout</Nav.Link>  
      </Nav></>:<Nav className="me-auto">
      <Nav.Link href="/admin/login">Login</Nav.Link>
      </Nav>} 
     
    </Navbar.Collapse>

</Navbar>
                
               
                   
                    <Switch>
                        <Route path="/admin/login" component={Loginpage} />
                        <Route path="/admin/showusers" component={Showusers} />
                        <Route path="/admin/addbranch" component={Addbranch} />
                        <Route path="/admin/home" component={Homepage} />
                        <Redirect to={"/admin/login"}/>
                    </Switch>
                </Router>
          
        );
    }
}
export default AppNavbar;