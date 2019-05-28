import { 
    UPLOADFILE_SEND,
    UPLOADFILE_SUCCESS,
    UPLOADFILE_ERROR
  } from './../actions/types';
  
  const initialState = {
    loading: false,
    error: false,
    message: '',
    data: []
  };
    
  export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOADFILE_SEND:
      return {...state, data: [],loading: action.playload};
    case UPLOADFILE_SUCCESS:
      return {...state, data: action.playload, error: false, message: '',loading: false};
    case UPLOADFILE_ERROR:
      return {...state,data: [], error: true, message: action.playload,loading: false};
    default:
      return state;
  }
}