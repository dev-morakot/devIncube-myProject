import { LOAER_COMPLETED, LOAER_PROCESSING } from './types';

export const loadProcessing = (text) => {
    return dispatch => {
        dispatch({type: LOAER_PROCESSING, playload: {loading: true, text: text}});
    }
}

export const loadCompleted = () => {
    return dispatch => {
        dispatch({type: LOAER_COMPLETED, playload: {loading: false, text: ''}});
    }
}