import axios from 'axios';
import * as Constants from './../constants/constants';
import { storage } from '../firebase';
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
  const image = user.imageAvatar;
  console.log(image.name)
  if (image.name !== 'Object') {
    const uploadTask = storage.ref(`images/${image.name}`).put(user.imageAvatar);
    console.log(uploadTask)
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
      },
      (error) => {
        // error function ....
      },
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          axios.post(Constants.URL_REGISTER, {
            username: user.username,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            urlAvatar: url
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
          console.log(url);
        })
      });
  } else {
    dispatch({
      type: Types.REGISTER_USER_FAIL,
      errors: {errors : { imageAvatar: 'Image Avatar is empty' }}
    })
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: Types.LOGOUT_USER,
  });
}

export const loadUser = (token) => dispatch => {
  axios.post(Constants.URL_LOADUSER, { token })
    .then(res => {
      dispatch({
        type: Types.LOAD_USER,
        user: res.data
      });
    }
    )
    .catch(error => { })
}

//Clear error message user

export const clearErrorUser = () => dispatch => {
  dispatch({
    type: Types.CLEAR_ERROR_USER
  })
}