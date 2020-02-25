import * as Types from '../actions/types';

const initialState = {
    user: {
        token: localStorage.getItem('jwtToken') || ''
    },
    isAuthenticated: (localStorage.getItem('jwtToken')) ? true :false,
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