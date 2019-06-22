import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import {logout, checkAuthentication } from './actions';
import Login from './views/Pages/Login/Login';
import './App.scss';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import _ from 'lodash';
import history from './history';
import Loadable from 'react-loadable';
import i18n from 'i18next';


// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';



const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const LoadingPage = Loadable({loader: () => import('./views/Pages/LoadingPage/LoadingPage'),loading});
// Pages
//const Login = React.lazy(() => import('./views/Pages/Login'));


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reloadPage: false,
      loadMaster: false,
      isSignedIn: false // Local signed-in state.

    }
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
   
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  componentDidMount(){ 
    if('undefined' !== typeof localStorage.getItem('useLang')&&!_.isNull(localStorage.getItem('useLang'))){
      i18n.changeLanguage(localStorage.getItem('useLang'));
    }else{
      i18n.changeLanguage('en');
    }

    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    );
  }


  componentWillReceiveProps(nextProps) {
  
  }

  render() {

    return (
      <HashRouter>

          <React.Suspense fallback={loading()}>
            {!this.state.isSignedIn&&
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route path="/" name="Loading Page" component={LoadingPage} />
              
            </Switch>}
            {this.state.isSignedIn&&
              <Switch>


              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
            }
          </React.Suspense>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  console.log('app.js', state);
  return {auth: state.auth};
}

export default connect(mapStateToProps,{logout,checkAuthentication}) (App);
