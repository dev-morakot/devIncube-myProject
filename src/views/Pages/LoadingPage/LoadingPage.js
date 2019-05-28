import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import loader from './../../../assets/img/loader.svg';
import logo from './../../../assets/img/react.svg';
const style = {
  box : {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
}
class LoadingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount(){ 
    this.checkRedirectPage();
  }

  checkRedirectPage(){
    let i = 0;
    this.loop = setInterval(()=>{
      i++;
      if(i>=3){
        clearInterval(this.loop);
        this.setState({redirect: true});
      }
    },1000);
  }

  render() {
    if(this.state.redirect&&!this.props.auth.login){
      return <Redirect push to="/login"/>;
    }
    return (
      <div className="app flex-row align-items-center">
        <div style={style.box}>
          <img src={logo} width={150} alt=""/>
          <div><img src={loader} alt=""/></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default  connect(mapStateToProps,{})(LoadingPage);
