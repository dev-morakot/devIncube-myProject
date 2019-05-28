import axios from 'axios';
import { BACKEND_ENDPOINT }  from './../config/config';
import { 
  UPLOADFILE_SEND,
  UPLOADFILE_SUCCESS,
  UPLOADFILE_ERROR,
  LOAER_PROCESSING,
  LOAER_COMPLETED
} from './types';
import {apiHeader} from './header';

export const uploadFile = (file) => {  
  return dispatch => {
    dispatch({type: UPLOADFILE_SEND, playload: false});
    dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: 'uploading'}});
    axios.post(BACKEND_ENDPOINT+'/uploads/file', file,apiHeader()).then(function (response) {
      dispatch({type: UPLOADFILE_SUCCESS, playload: response.data});
      dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
    }).catch(function (error) {
      dispatch({type: UPLOADFILE_ERROR, playload: error.response.data});
      dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
    })
  }
}