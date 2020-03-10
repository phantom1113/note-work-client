import axios from 'axios';
import * as Constants from './../constants/constants';
import * as Types from './types';


export const loginUser = (user) => dispatch => {
  axios.post(Constants.URL_LOGIN, {
    email: user.email,
    password: user.password
  })
    .then(res => {
      localStorage.setItem('jwtToken', res.data.token);
      dispatch({
        type: Types.LOGIN_USER_SUCCESS,
        user: res.data
      })
    }
    )
    .catch(error => {
      dispatch({
        type: Types.LOGIN_USER_FAIL,
        errors: error.response.data
      })
    })
};

export const registerUser = (user) => dispatch => {
  axios.post(Constants.URL_REGISTER, {
    username: user.username,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword
  })
    .then(res => {
      localStorage.setItem('jwtToken', res.data.token);
      dispatch({
        type: Types.REGISTER_USER_SUCCESS,
        user: res.data
      })
    }
    )
    .catch(error => {
      dispatch({
        type: Types.REGISTER_USER_FAIL,
        errors: error.response.data
      })
    })
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: Types.LOGOUT_USER,
  });
}

//Clear error message user

export const clearErrorUser = () => dispatch => {
  dispatch({
    type: Types.CLEAR_ERROR_USER
  })
}