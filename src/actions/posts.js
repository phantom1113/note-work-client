import axios from 'axios';
import * as Constants from './../constants/constants'
import * as Types from './types';


export const getPosts = () => dispatch => {
    axios.get(Constants.URL_POST)
    .then(res =>
      dispatch({
        type: Types.GET_POSTS,
        posts: res.data
      })
    )
};