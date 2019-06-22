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