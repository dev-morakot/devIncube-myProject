import React , {Component} from 'react';
import { Redirect, HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Auth } from 'aws-amplify';
import Loader from './../../../components/Loader';
import {login, loadCompleted, loadProcessing, facebookLogin } from './../../../actions'
import _ from 'lodash';


// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
//import auth from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5kHHodF2Hbj7oEbB_577t9AyCiPIwxj4",
    authDomain: "dev-project-ef9cf.firebaseapp.com",
    databaseURL: "https://dev-project-ef9cf.firebaseio.com",
    projectId: "dev-project-ef9cf",
    storageBucket: "",
    messagingSenderId: "46127640904",
    appId: "1:46127640904:web:1af058d2743f0340"
};

// Instantiate a Firebase app.
firebase.initializeApp(firebaseConfig);

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          page: false,
          email: '',
          password: '',
          processType: 'login',
          currentUser: null,
          message: '',
          isSignedIn: false // Local signed-in state.

      }
      
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }


  componentWillReceiveProps(nextProps) {
    /*if(this.state.processType === 'success') {

      this.resultLogin(nextProps.auth.data);
    }*/
  }

  /*resultLogin(message) {
    this.setState({processType: ''});
    console.log('result',message);
    if(_.has(message, 'error')&& message.error !== null) {

      Swal.fire({
        type: 'error',
        title: 'Search Flight',
        text: message.error,
        allowOutsideClick: false,
        allowEscapeKey: false
      });

    } else {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Search Flight',
        text: 'Search Flight success.',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 3000,
        onClose: () => {

            this.LoadingPage();

        }
    });
    }
  }*/

  handleChange = e => {
    const { name , value } = e.target;
    this.setState({[name]: value});
  }

 

  checkButtonLogin() {
    if(this.state.username !== '' && this.state.password !== '') {
      return true;
    } else {
      return false;
    }
  }

  async login(e) {
    e.preventDefault();
    const { email, password } = this.state
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          currentUser: response.user
        })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  render() {

    if(this.state.isSignedIn) {
        return <Redirect push to={'/admin/purchaseOrder'}/>;
    }
  
    return (
      <div className="app flex-row align-items-center">
      {this.props.loader.loading&&
        <Loader text={this.props.loader.text}/>}
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={this.state.email} name="email" onChange={e=>this.handleChange(e)}  placeholder="Email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" value={this.state.password} onChange={e=>this.handleChange(e)}  type="password" placeholder="Password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" onClick={e=>this.login(e)} className="px-4">Login</Button>
                        </Col>
                       
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      
                     {!this.state.isSignedIn &&
                      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                    }
                    
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  console.log(state);
  return { loader: state.loader, auth: state.auth}
}

export default connect(mapStateToProps,{facebookLogin,login,loadProcessing,loadCompleted})(Login);
