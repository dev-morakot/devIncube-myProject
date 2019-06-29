import { 
    PURCHASE_ORDER_LINE_FETCH, 
    PURCHASE_ORDER_LINE_DELETE_ERROR,
    PURCHASE_ORDER_LINE_DELETE_SUCCESS,
    PURCHASE_ORDER_LINE_UPDATE_ERROR,
    PURCHASE_ORDER_LINE_UPDATE_SUCCESS

} from './../actions/types';

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: []
  };

export default function(state = initialState, action) {
    switch (action.type) {
        case PURCHASE_ORDER_LINE_FETCH:
            return {...state, data: action.playload};

        case PURCHASE_ORDER_LINE_DELETE_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PURCHASE_ORDER_LINE_DELETE_ERROR:
            return {...state, error: true, message: action.playload};

        case PURCHASE_ORDER_LINE_UPDATE_SUCCESS:
            return {...state, data: action.playload, error: false, message: ''};
        case PURCHASE_ORDER_LINE_UPDATE_ERROR:
            return {...state, error: true,message: action.playload};
        
        default:
            return state;
    }
}