import * as Types from '../actions/types';

const initialState = {
    posts: [],
    loading: true
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_POSTS:
            return {
                ...state,
                posts: action.posts,
            };
        default: return { ...state };
    }
}

export default postsReducer;