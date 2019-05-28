import { 
    AUTH_CHECK_AUTHENTICATION, 
    AUTH_LOGIN, 
    AUTH_LOGOUT,
    AUTH_CHOOSE_ROLE
} from './../actions/types';
  
const initialState = {
    login: false,
    info: {},
    under: [],
    accessToken: null 
};

export default function(state = initialState , action) {
    let newState = state;
    switch (action.type) {
        case AUTH_CHECK_AUTHENTICATION:
            return {...state,...action.playload};
        case AUTH_LOGIN:
            return {...state,...action.playload};
        case AUTH_LOGOUT:
            return {...state,...action.playload};
        case AUTH_CHOOSE_ROLE:
            newState.info.role = action.playload.role;
            return {...newState,autoRefresh: true};
        default:
            return state;
    }
}
