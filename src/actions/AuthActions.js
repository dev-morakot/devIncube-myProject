import axios from 'axios';
import _ from 'lodash';
import { BACKEND_ENDPOINT }  from './../config/config';
import { AUTH_CHECK_AUTHENTICATION, AUTH_LOGIN, AUTH_LOGOUT,AUTH_CHOOSE_ROLE } from './types';
import {apiHeader} from './header';


export const checkAuthentication = (session) => {
    return dispatch => {
        if(null!==localStorage.getItem('auth')&&parseInt(localStorage.getItem('auth').toString())){
            dispatch({type: AUTH_CHECK_AUTHENTICATION, playload: {login: true, info: {
                profile: session,
                login_type: 'facebook',
            }}});
        } else {
            dispatch({type: AUTH_CHECK_AUTHENTICATION, playload: {}});
        }
    }
}

export const login = (session) => {
    return dispatch => {
        let type = 'not-role';
        localStorage.setItem('auth', 1);
        localStorage.setItem('usertype', type);
        localStorage.setItem('reloadLogin', 0);
        axios.get(BACKEND_ENDPOINT+'/users/profile/', apiHeader()).then(function (response) {
            dispatch({type: AUTH_LOGIN, playload: {login: true, info: {
                profile: response.data,
                role: '',
            }, accessToken: '' }});
        }).catch(function (error) {
            dispatch({type: AUTH_LOGIN, playload: []})
        });
    }
}

export const facebookLogin = (res) => {
    return dispatch => {
        let type = 'not-role';
        localStorage.setItem('auth', 1);
        localStorage.setItem('usertype', 0);
        localStorage.setItem('reloadLogin', 0);
       
        dispatch({type: AUTH_LOGIN, playload: {login: true, info: {
            profile: res,
            login_type: 'facebook',
        }}});
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.setItem('auth', 0);
        localStorage.setItem('usertype','');
        localStorage.setItem('reloadLogin', 0);
       
        dispatch({type: AUTH_LOGOUT, playload: {login: false, info: {}}});
    }
}

export const chooseRole = (role) => {
    return dispatch => {
        localStorage.setItem('usertype', role);
        dispatch({type: AUTH_CHOOSE_ROLE, playload: {role: role}});
    }
}