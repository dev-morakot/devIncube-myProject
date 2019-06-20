import React , {Component} from 'react';
import { Redirect, HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Auth } from 'aws-amplify';
import Loader from './../../../components/Loader';
import {login, loadCompleted, loadProcessing, facebookLogin } from './../../../actions'
import _ from 'lodash';
import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          page: false,
          username: '',
          password: '',
          processType: 'login'
      }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.processType === 'success') {

      this.resultLogin(nextProps.auth.data);
    }
  }

  resultLogin(message) {
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
  }

  handleChange = e => {
    const { name , value } = e.target;
    this.setState({[name]: value});
  }

  handdleEnter(e) {
    if('Enter' ===e.key&&this.checkButtonLogin()) {
      this.login(e);
    }
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
    if(this.state.username!==''&&this.state.password!=='') {
      this.props.loadProcessing('verifiting');
      const input = {
        username: this.state.username,
        password: this.state.password,
        grant_type: 'password'
      }
      //this.setState({processType: 'success'});
      //this.props.login(input)
      if (this.state.username === 'demo' && this.state.password === '1234') {
       // this.setState({processType: 'success'});
        this.setState({page: true});
      }
      //this.setState({page: true});
    }
  }

  LoadingPage = () => {
      this.setState({page: true});
  }

  responseFacebook = (response) => {
   // this.props.loadProcessing('verifiting');
    if(response) {
      this.props.loadCompleted();
      console.log(response);
      this.props.facebookLogin(response);
    }
  }

  render() {

    if(this.state.page) {
        return <Redirect push to={'/dashboard'}/>;
    }
   
    const responseGoogle = (response) => {
      console.log(response);
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
                        <Input type="text" value={this.state.username} name="username" onChange={e=>this.handleChange(e)} onKeyPress={e=>this.handdleEnter(e)}  placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" value={this.state.password} onChange={e=>this.handleChange(e)} onKeyPress={e=>this.handdleEnter(e)} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" onClick={e=>this.login(e)} className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                        

                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      
                      <p>
                      <GoogleLogin
                          clientId="160597490665-s6oahloofim01prhkdmq7qd0r7l839k7.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                          buttonText="LOGIN WITH GOOGLE"
                          onSuccess={this.googleResponse}
                          onFailure={this.onFailure}
                        />
                      </p>
                      
                      <FacebookLogin
                        appId="725434274515316" //APP ID NOT CREATED YET
                        fields="name,email,picture"
                        
                        icon="fa-facebook"
                        callback={this.responseFacebook}
                      />
                     
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
