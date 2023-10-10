import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { PostsContext } from '../context/PostsContext';
import { CommentsContext } from '../context/CommentsContext';

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
    const { dispatch: postsDispatch } = useContext(PostsContext);
    const { dispatch: commentsDispatch } = useContext(CommentsContext);

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('blogUser');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        postsDispatch({type: 'SET_POSTS', payload: null});
        commentsDispatch({type: 'SET_COMMENTS', payload: null});
    }

    return {logout}
}