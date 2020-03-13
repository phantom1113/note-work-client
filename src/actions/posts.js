import axios from 'axios';
import { checkToken } from '../util/convertToken';
import * as Constants from './../constants/constants'
import * as Types from './types';

//Get all posts
export const getPosts = () => dispatch => {
  axios.get(Constants.URL_POST)
    .then(res =>
      dispatch({
        type: Types.GET_POSTS,
        posts: res.data
      })
    )
};

//Set loading all post
export const loadingPosts = () => dispatch => {
  dispatch({
    type: Types.LOADING
  })
};

// Set loading data state
export const loadingPost = () => dispatch => {
  dispatch({
    type: Types.LOADING_POST
  })
};

// Get detail post
export const getPost = (postId) => dispatch => {
  axios.get(Constants.URL_POST + "/" + postId)
    .then(res => {
      dispatch({
        type: Types.LOADING_POST
      })
      dispatch({
        type: Types.GET_POST,
        post: res.data
      })
    }
    )
};

//Create a post
export const createPost = (value) => dispatch => {
  if (checkToken(localStorage.getItem('jwtToken'))) {
    axios.post(Constants.URL_POST, { body: value.body }, tokenConfig())
      .then(res => {
        dispatch({
          type: Types.CREATE_POST,
          post: res.data
        })
      }
      ).catch(error => {
        dispatch({
          type: Types.CREATE_POST_FAIL,
          errors: error.response.data
        })
      })
  } else {
    dispatch({
      type: Types.TOKEN_EXPIRED
    })
  }
};

//Delete post
export const deletePost = (id, callback) => dispatch => {
  if (checkToken(localStorage.getItem('jwtToken'))) {
    axios.delete(Constants.URL_POST + `/${id}`, tokenConfig())
      .then(res => {
        dispatch({
          type: Types.DELETE_POST,
          id: id
        })
      })
      .then(() => {
        if (callback) {
          callback()
        }
      }).catch(error => {
        console.log(error)
      })
  } else {
    dispatch({
      type: Types.TOKEN_EXPIRED
    })
  }
}

//Like a post
export const likePost = (id) => dispatch => {
  if (checkToken(localStorage.getItem('jwtToken'))) {
    axios.post(Constants.URL_POST + `/${id}`, {}, tokenConfig())
    .then(res => {
      dispatch({
        type: Types.LIKE_POST,
        post: res.data
      })
    }).catch(error => {
      console.log(error)
    })
  } else {
    dispatch({
      type: Types.TOKEN_EXPIRED
    })
  }
}

//Search post
export const searchPost = (body) => dispatch => {
  axios.get(Constants.URL_POST)
  .then(res =>
    dispatch({
      type: Types.SEARCH_POST,
      body: body,
      posts: res.data
    })
  )
}

//Clear error
export const clearError = () => dispatch => {
  dispatch({
    type: Types.CLEAR_ERROR,
  })
}

const tokenConfig = () => {
  const token = localStorage.getItem('jwtToken');
  //Header
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  if (token !== '') {
    config.headers['Authorization'] = token;
  }

  return config;
}

