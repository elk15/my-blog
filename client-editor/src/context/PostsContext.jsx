import { useReducer } from "react";
import { createContext } from "react";

export const PostsContext = createContext();

const PostsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'UPDATE_POST':
            return {
                posts: state.posts.map((p) => {
                    if (p._id === action.payload._id) {
                        return action.payload;
                    }
                    return;
                })
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const PostsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(PostsReducer, {
        posts: null
    });

    return (
        <PostsContext.Provider value={{...state, dispatch}}>
            { children }
        </PostsContext.Provider>
    )
}