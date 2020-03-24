import axios from 'axios';
import store from '../store/store'
import { checkToken } from '../util/convertToken';
import * as Constants from './../constants/constants'
import * as Types from './types';
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT)
const likeEvent = (id) => {
  socket.emit('like event', { id: id })
}
const commentEvent = (id) => {
  console.log(id)
  socket.emit('commnet event', { id: id })

}
socket.on('like event from another client', (data) => {
  const words = window.location.pathname.split('/');
  if (words[2] === data.id) {
    axios.get(Constants.URL_POST + "/" + data.id)
      .then(res => {
        store.dispatch({
          type: Types.LOADING_POST
        })
        store.dispatch({
          type: Types.GET_POST,
          post: res.data
        })
      }
      )
  } else {
    axios.get(Constants.URL_POST)
      .then(res =>
        store.dispatch({
          type: Types.GET_POSTS,
          posts: res.data
        })
      )
  }
})

socket.on('comment event from another client', (data) => {
  const words = window.location.pathname.split('/');
  if (words[2] === data.id) {
    axios.get(Constants.URL_POST + "/" + data.id)
      .then(res => {
        store.dispatch({
          type: Types.LOADING_POST
        })
        store.dispatch({
          type: Types.GET_POST,
          post: res.data
        })
      }
      )
  }
})

//Error Connenction
socket.io.on('connect_error', (err) => socket.disconnect());

//Get all posts
export const getPosts = (posts) => dispatch => {
  axios.get(Constants.URL_POST)
    .then(res => {
      dispatch({
        type: Types.GET_POSTS,
        posts: res.data
      })
    }
    ).catch(error => {
      console.log(error)
    })
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
          post: res.data,
          likeEvent: likeEvent
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

//Create comment in post
export const createComment = (id, comment) => dispatch => {
  if (checkToken(localStorage.getItem('jwtToken'))) {
    axios.post(Constants.URL_COMMENT, { postId: id, body: comment }, tokenConfig())
      .then(res =>
        dispatch({
          type: Types.CREATE_COMMENT,
          post: res.data,
          commentEvent: commentEvent
        })
      )
      .catch(error => {
        dispatch({
          type: Types.CREATE_COMMENT_FAIL,
          errors: error.response.data
        })
      })
  } else {
    dispatch({
      type: Types.TOKEN_EXPIRED
    })
  }
};

//Update comment in post
export const updateComment = (postId, commentId, body) => dispatch => {
  console.log(body)
  if (checkToken(localStorage.getItem('jwtToken'))) {
    axios.put(Constants.URL_COMMENT + `/${commentId}`, { postId: postId, body: body }, tokenConfig())
      .then(res =>
        dispatch({
          type: Types.UPDATE_COMMENT,
          post: res.data,
          commentEvent: commentEvent
        })
      ).catch(error => {
        dispatch({
          type: Types.CREATE_COMMENT_FAIL,
          errors: error.response.data
        })
      })
  } else {
    dispatch({
      type: Types.TOKEN_EXPIRED
    })
  }
};

//Delete comment in post
export const deleteComment = (postId, commentId) => dispatch => {
  if (checkToken(localStorage.getItem('jwtToken'))) {
    axios.post(Constants.URL_COMMENT + `/${commentId}`, { postId: postId }, tokenConfig())
      .then(res =>
        dispatch({
          type: Types.DELETE_COMMENT,
          post: res.data,
          commentEvent: commentEvent
        })
      )
  } else {
    dispatch({
      type: Types.TOKEN_EXPIRED
    })
  }
};

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

