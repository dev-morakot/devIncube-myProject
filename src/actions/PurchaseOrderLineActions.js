import axios from 'axios';
import { BACKEND_ENDPOINT } from './../config/config';
import {
    
    PURCHASE_ORDER_LINE_FETCH,
    PURCHASE_ORDER_LINE_DELETE_ERROR,
    PURCHASE_ORDER_LINE_DELETE_SUCCESS,
    PURCHASE_ORDER_LINE_UPDATE_SUCCESS,
    PURCHASE_ORDER_LINE_UPDATE_ERROR,
    LOAER_COMPLETED,
    LOAER_PROCESSING
} from './types';
import { apiHeader } from './header';

export const purchaseOrderLineFetch = (id) => {
    return dispatch => {
        dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'loading'}});
        axios.get(BACKEND_ENDPOINT + '/api/purchaseOrderLine/read_one.php?id=' + id, apiHeader().headers).then(function (response) {
            dispatch({type: PURCHASE_ORDER_LINE_FETCH, playload: response.data.records});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
            dispatch({type: PURCHASE_ORDER_LINE_FETCH, playload: []});
            dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
    }
}


export const purchaseOrderLineDelete = (id) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'deleting'}});
      axios.post(BACKEND_ENDPOINT + '/api/purchaseOrderLine/delete.php', id,apiHeader()).then(function(res) {
        axios.get(BACKEND_ENDPOINT + '/api/purchaseOrderLine/read.php',apiHeader()).then(function(res) {
          dispatch({type: PURCHASE_ORDER_LINE_DELETE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PURCHASE_ORDER_LINE_DELETE_ERROR, playload: error});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PURCHASE_ORDER_LINE_DELETE_ERROR, playload: error});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
      
    }
  }



  export const purchaseOrderLineUpdate = (product) => {
    return dispatch => {
      dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'updating'}});
     
      axios.post(BACKEND_ENDPOINT + '/api/purchaseOrderLine/update.php', product,apiHeader()).then(function (response) {
        axios.get(BACKEND_ENDPOINT + '/api/purchaseOrderLine/read.php',apiHeader()).then(function (res) {
          dispatch({type: PURCHASE_ORDER_LINE_UPDATE_SUCCESS, playload: res.data});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        }).catch(function (error) {
          dispatch({type: PURCHASE_ORDER_LINE_UPDATE_ERROR, playload: error.message});
          dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
        });
      }).catch(function (error) {
        dispatch({type: PURCHASE_ORDER_LINE_UPDATE_ERROR, playload: error.message});
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
      });
    }
}