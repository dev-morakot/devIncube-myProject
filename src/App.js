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
      loadMaster: false
    }
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    if(localStorage.getItem('auth') === 1) {
      this._handdleLogged(this.props.auth.info.profile);
    } else {
      this._handdleNotLogged();
    }
    
    
  }

  componentDidMount(){ 
    if('undefined' !== typeof localStorage.getItem('useLang')&&!_.isNull(localStorage.getItem('useLang'))){
      i18n.changeLanguage(localStorage.getItem('useLang'));
    }else{
      i18n.changeLanguage('en');
    }
  }

  _handdleLogged() {
    this.props.checkAuthentication();
  }

  _handdleNotLogged(err){
    this.props.logout();
  }

  _handdleReloadPage(){
    this.setState({reloadPage: true});
    if(parseInt(localStorage.getItem('usertype'))===0) {
      localStorage.setItem('reloadLogin', 1);
      window.location.reload();
    }
  }

  _handleSwitchReleReload(refresh) {
    if(refresh) {
      history.push('/');
      window.location.reload();
    }
  }

  componentWillReceiveProps(nextProps) {
   // this._handdleReloadPage();
    if(_.has(nextProps,'auth.autoRefresh')){
      this._handleSwitchReleReload(nextProps.auth.autoRefresh);
    }
  }

  render() {

    return (
      <HashRouter>

          <React.Suspense fallback={loading()}>
          <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
           {/* {!this.props.auth.login&&
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route path="/" name="Loading Page" component={LoadingPage} />
              
            </Switch>}
            {this.props.auth.login&&
              <Switch>


              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
            }*/}
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
