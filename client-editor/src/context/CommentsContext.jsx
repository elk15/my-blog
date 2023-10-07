import { useReducer } from "react";
import { createContext } from "react";

export const CommentsContext = createContext();

const commentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((c) => c._id !== action.payload._id)
            }
        case 'UPDATE_COMMENT':
            return {
                comments: state.comments.map((c) => {
                    if (c._id === action.payload._id) {
                        return action.payload;
                    }
                    return c;
                })
            }
        default:
            return state;
    }
}

export const CommentsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(commentsReducer, {
        comments: null
    });

    return (
        <CommentsContext.Provider value={{...state, dispatch}}>
            { children }
        </CommentsContext.Provider>
    )
}