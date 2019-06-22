import axios from 'axios';
import { BACKEND_ENDPOINT } from './../config/config';
import {
    PARTNER_FETCH,
    PARTNER_ADD_ERROR,
    PARTNER_ADD_SUCCESS,
    PARTNER_DELETE_ERROR,
    PARTNER_DELETE_SUCCESS,
    PARTNER_UPDATE_ERROR,
    PARTNER_UPDATE_SUCCESS,
    LOAER_COMPLETED,
    LOAER_PROCESSING
} from './types';
import { apiHeader } from './header';

export const partnerFetch = () => {
    return dispatch => {
        dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'loading'}});
        axios.get(BACKEND_ENDPOINT + '/api/partner/read.php', apiHeader().headers).then(function (response) {
            dispatch({type: PARTNER_FETCH, playload: response.data.records});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
            dispatch({type: PARTNER_FETCH, playload: []});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
    }
}


export const partnerAdd = (partner) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'saving'}});
      axios.post(BACKEND_ENDPOINT + '/api/partner/create.php', partner,apiHeader()).then(function (response) {
        axios.get(BACKEND_ENDPOINT + '/api/partner/read.php',apiHeader()).then(function (response) {
          dispatch({type: PARTNER_ADD_SUCCESS, playload: response.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PARTNER_ADD_ERROR, playload: error});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PARTNER_ADD_ERROR, playload: error});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
    }
}
  
export const partnerDelete = (id) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'deleting'}});
      axios.post(BACKEND_ENDPOINT + '/api/partner/delete.php', id,apiHeader().headers).then(function(res) {
        axios.get(BACKEND_ENDPOINT + '/api/partner/read.php',apiHeader()).then(function(res) {
          dispatch({type: PARTNER_DELETE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PARTNER_DELETE_ERROR, playload: error});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PARTNER_DELETE_ERROR, playload: error});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
      
    }
}
  
export const partnerUpdate = (partner) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'updating'}});
      axios.post(BACKEND_ENDPOINT + '/api/partner/update.php' , partner,apiHeader()).then((res) => {
        axios.get(BACKEND_ENDPOINT + '/api/partner/read.php',apiHeader()).then((res) => {
          dispatch({type: PARTNER_UPDATE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch((error) => {
          dispatch({type: PARTNER_UPDATE_ERROR, playload: error.response});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch((error) => {
        dispatch({type: PARTNER_UPDATE_ERROR, playload: error.response});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
      
    }
}