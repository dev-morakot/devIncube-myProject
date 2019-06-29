import axios from 'axios';
import { BACKEND_ENDPOINT } from './../config/config';
import {
    PRODUCT_FETCH,
    PRODUCT_ADD_ERROR,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_UPDATE_ERROR,
    PRODUCT_UPDATE_SUCCESS,
    LOAER_COMPLETED,
    LOAER_PROCESSING
} from './types';
import { apiHeader } from './header';

export const productFetch = () => {
    return dispatch => {
        dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'loading'}});
        axios.get(BACKEND_ENDPOINT+'/api/product/read.php', apiHeader().headers).then(function (response) {
            dispatch({type: PRODUCT_FETCH, playload: response.data.records});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
            dispatch({type: PRODUCT_FETCH, playload: []});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
    }
}


export const productAddItem = (product) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'saving'}});
     
      axios.post(BACKEND_ENDPOINT + '/api/product/create.php', product,apiHeader()).then(function (response) {
        axios.get(BACKEND_ENDPOINT + '/api/product/read.php',apiHeader()).then(function (res) {
          dispatch({type: PRODUCT_ADD_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PRODUCT_ADD_ERROR, playload: error.message});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PRODUCT_ADD_ERROR, playload: error.message});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
    }
}
  
export const productDelete = (id) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'deleting'}});
      axios.post(BACKEND_ENDPOINT + '/api/product/delete.php', id,apiHeader()).then(function(res) {
        axios.get(BACKEND_ENDPOINT + '/api/product/read.php',apiHeader()).then(function(res) {
          dispatch({type: PRODUCT_DELETE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PRODUCT_DELETE_ERROR, playload: error});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PRODUCT_DELETE_ERROR, playload: error});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
      
    }
}
  
export const productUpdate = (product) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'updating'}});
      axios.post(BACKEND_ENDPOINT + '/api/product/update.php', product,apiHeader()).then((res) => {
        axios.get(BACKEND_ENDPOINT + '/api/product/read.php',apiHeader()).then((res) => {
          dispatch({type: PRODUCT_UPDATE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch((error) => {
          dispatch({type: PRODUCT_UPDATE_ERROR, playload: error.response});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch((error) => {
        dispatch({type: PRODUCT_UPDATE_ERROR, playload: error.response});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
      
    }
}