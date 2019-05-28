import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

import { LANGUAGE,ROLES } from './../../config/config';
import _ from 'lodash';
import i18n from 'i18next';
import Lang from './../../components/Lang/Lang';
import { connect } from 'react-redux';
import { chooseRole } from './../../actions';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      useLang: 'en',
      useFlag: 'us'
    }
  }

  componentDidMount(){
    if('undefined' !== typeof localStorage.getItem('useLang')&&!_.isNull(localStorage.getItem('useLang'))){
      this.setState({useLang: localStorage.getItem('useLang')});
      i18n.changeLanguage(localStorage.getItem('useLang'));
    }else{
      i18n.changeLanguage(this.state.useLang);
    }
    if('undefined' !== typeof localStorage.getItem('useFlag')&&!_.isNull(localStorage.getItem('useFlag'))){
      this.setState({useFlag: localStorage.getItem('useFlag')});
    }
  }

  switchRole(role){
    this.props.chooseRole(role);
  }

  switchLang(lang,flag){
    i18n.changeLanguage(lang);
    this.setState({useLang: lang,useFlag: flag});
    localStorage.setItem('useLang',lang);
    localStorage.setItem('useFlag',flag);
    setTimeout(()=>{
      window.location.reload();
    }, 1000)
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto" navbar>

        <AppHeaderDropdown direction="down">
            <DropdownToggle nav caret>
              <span><i className={'flag-icon flag-icon-'+this.state.useFlag+' h5 md-0'}></i></span>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-left"><strong><Lang name="Switch Language"/></strong></DropdownItem>
              {LANGUAGE.map((lang,lkey)=>{
                return (
                  <span key={lkey}>
                    {lang.name===this.state.useLang?
                    <DropdownItem style={{background: '#f2f2f2'}}><i className={'flag-icon flag-icon-'+lang.flag+' h4 md-0'}></i> <Lang name={lang.label}/></DropdownItem>
                    :
                    <DropdownItem onClick={this.switchLang.bind(this,lang.name,lang.flag)}><i className={'flag-icon flag-icon-'+lang.flag+' h4 md-0'}></i> <Lang name={lang.label}/></DropdownItem>
                    }
                  </span>
                )
              })}
            </DropdownMenu>
          </AppHeaderDropdown>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>

              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { auth: state.auth};
}

export default connect(mapStateToProps,{chooseRole})(DefaultHeader);
