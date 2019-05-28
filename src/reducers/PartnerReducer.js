import { 
    PARTNER_FETCH, 
    PARTNER_ADD_SUCCESS,
    PARTNER_ADD_ERROR,
    PARTNER_UPDATE_ERROR, 
    PARTNER_UPDATE_SUCCESS, 
    PARTNER_DELETE_ERROR,
    PARTNER_DELETE_SUCCESS,
} from './../actions/types';

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: []
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case PARTNER_FETCH:
            return {...state, data: action.playload};

        case PARTNER_ADD_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PARTNER_ADD_ERROR:
            return {...state, error: true, message: action.playload};

        case PARTNER_DELETE_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PARTNER_DELETE_ERROR:
            return {...state, error: true, message: action.playload};
       
        case PARTNER_UPDATE_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PARTNER_UPDATE_ERROR:
            return {...state, error: true,message: action.playload};
        default:
            return state;
    }
}