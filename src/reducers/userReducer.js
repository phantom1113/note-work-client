import * as Types from '../actions/types';
import { checkToken } from '../util/convertToken';


const initialState = {
    user: {
        token: checkToken(localStorage.getItem('jwtToken')) ? localStorage.getItem('jwtToken') : ''
    },
    isAuthenticated: checkToken(localStorage.getItem('jwtToken')) ? true : false,
    errors: {}
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                errors: {}
            };
        case Types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true
            };
        case Types.LOGIN_USER_FAIL:
            return {
                ...state,
                errors: action.errors,
                isAuthenticated: false
            };
        case Types.REGISTER_USER_FAIL:
            return {
                ...state,
                errors: action.errors,
                isAuthenticated: false
            }
        case Types.TOKEN_EXPIRED:
            return {
                user: {
                    token: ''
                },
                errors: {
                    errors:"Token is expired"
                },
                isAuthenticated: false
            }
        case Types.CLEAR_ERROR_USER:
            return {
                ...state,
                errors:{}
            }
        case Types.LOGOUT_USER:
            return {
                user: {
                    token: ''
                },
                isAuthenticated: false,
                errors: {}
            }
        default: return { ...state };
    }
}

export default userReducer;