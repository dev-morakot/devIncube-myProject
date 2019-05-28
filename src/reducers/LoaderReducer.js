import { LOAER_PROCESSING, LOAER_COMPLETED } from './../actions/types';

const initialState = {
    loading: false,
    text: 'loading'
};
  
export default function(state = initialState, action) {
switch (action.type) {
    case LOAER_PROCESSING:
    return {...state, loading: action.playload.loading, text: action.playload.text};
case LOAER_COMPLETED:
    return {...state, loading: action.playload.loading, text: action.playload.text};
    default:
    return state;
}
}