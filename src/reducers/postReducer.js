import * as Types from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading_post: true,
    loading: true,
    errors: {}
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOADING:
            return {
                ...state,
                loading: true
            };
        case Types.LOADING_POST:
            return {
                ...state,
                loading_post: true
            };
        case Types.GET_POSTS:
            return {
                ...state,
                posts: action.posts,
                loading: false
            };
        case Types.LIKE_POST:
            const prevPosts = state.posts
            let arr = [];
            let index = 0
            prevPosts.map(post => arr.push(post._id))
            index = arr.indexOf(action.post._id)
            prevPosts.splice(index, 1, action.post)
            return {
                ...state,
                post: action.post,
                posts: prevPosts
            }
        case Types.GET_POST:
            return {
                ...state,
                post: action.post,
                loading_post: false
            }
        case Types.CREATE_POST:
            const posts = state.posts
            posts.push(action.post)
            return {
                ...state,
                posts: posts,
                loading: false
            }
        case Types.CREATE_COMMENT_FAIL:
        case Types.CREATE_POST_FAIL:
            return {
                ...state,
                errors: action.errors
            }
        case Types.CLEAR_ERROR:
            return {
                ...state,
                errors: {}
            }
        case Types.DELETE_POST:
            const prevDeletePosts = state.posts
            const deletePosts = prevDeletePosts.filter(post => post._id !== action.id)
            return {
                ...state,   
                posts: deletePosts,                
            }
        case Types.SEARCH_POST:
            const filterPost = action.posts.filter(post => 
               post.body.toLowerCase().includes(action.body.toLowerCase())
            ) 
            return {
                ...state,
                posts:filterPost
            }
        case Types.CREATE_COMMENT:
        case Types.DELETE_COMMENT:
        case Types.UPDATE_COMMENT:
            return {
                ...state,
                post: action.post
            }
        default: return { ...state };
    }
}

export default postsReducer;