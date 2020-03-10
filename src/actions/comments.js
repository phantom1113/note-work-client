import axios from 'axios';
import { checkToken } from '../util/convertToken';
import * as Constants from './../constants/constants'
import * as Types from './types';

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

//Create comment in post
export const createComment = (id, comment) => dispatch => {
    if (checkToken(localStorage.getItem('jwtToken'))) {
        axios.post(Constants.URL_COMMENT, { postId: id, body: comment }, tokenConfig())
        .then(res =>
            dispatch({
                type: Types.CREATE_COMMENT,
                post: res.data
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
                post: res.data
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
                post: res.data
            })
        )
    } else {
        dispatch({
            type: Types.TOKEN_EXPIRED
        })
    }
};