import { 
    PRODUCT_FETCH, 
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_ERROR,
    PRODUCT_UPDATE_ERROR, 
    PRODUCT_UPDATE_SUCCESS, 
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_SUCCESS,
} from './../actions/types';

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: []
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_FETCH:
            return {...state, data: action.playload};

        case PRODUCT_ADD_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PRODUCT_ADD_ERROR:
            return {...state, error: true, message: action.playload};

        case PRODUCT_DELETE_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PRODUCT_DELETE_ERROR:
            return {...state, error: true, message: action.playload};
       
        case PRODUCT_UPDATE_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PRODUCT_UPDATE_ERROR:
            return {...state, error: true,message: action.playload};
        default:
            return state;
    }
}