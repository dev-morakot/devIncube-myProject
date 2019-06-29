import axios from 'axios';
import { BACKEND_ENDPOINT } from './../config/config';
import {
    PURCHASE_ORDER_DELETE_SUCCESS,
    PURCHASE_ORDER_FETCH,
    PURCHASE_ORDER_ADD_ERROR,
    PURCHASE_ORDER_ADD_SUCCESS,
    PURCHASE_ORDER_DELETE_ERROR,
    PURCHASE_ORDER_UPDATE_ERROR,
    PURCHASE_ORDER_UPDATE_SUCCESS,
    LOAER_COMPLETED,
    LOAER_PROCESSING
} from './types';
import { apiHeader } from './header';

export const purchaseOrderFetch = () => {
    return dispatch => {
        dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'loading'}});
        axios.get(BACKEND_ENDPOINT + '/api/purchaseOrder/read.php', apiHeader().headers).then(function (response) {
            dispatch({type: PURCHASE_ORDER_FETCH, playload: response.data.records});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
            dispatch({type: PURCHASE_ORDER_FETCH, playload: []});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
    }
}


export const purchaseOrderAdd = (product) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'saving'}});
     
      axios.post(BACKEND_ENDPOINT + '/api/purchaseOrder/create.php', product,apiHeader()).then(function (response) {
        axios.get(BACKEND_ENDPOINT + '/api/purchaseOrder/read.php',apiHeader()).then(function (res) {
          dispatch({type: PURCHASE_ORDER_ADD_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PURCHASE_ORDER_ADD_ERROR, playload: error.message});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PURCHASE_ORDER_ADD_ERROR, playload: error.message});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
    }
}



export const purchaseOrderUpdate = (product) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'updating'}});
     
      axios.post(BACKEND_ENDPOINT + '/api/purchaseOrder/update.php', product,apiHeader()).then(function (response) {
        axios.get(BACKEND_ENDPOINT + '/api/purchaseOrder/read.php',apiHeader()).then(function (res) {
          dispatch({type: PURCHASE_ORDER_UPDATE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PURCHASE_ORDER_UPDATE_ERROR, playload: error.message});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PURCHASE_ORDER_UPDATE_ERROR, playload: error.message});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
    }
}