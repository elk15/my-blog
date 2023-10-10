import { useContext } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { CommentsContext } from "../context/CommentsContext";

const ModerateComments = () => {
    const {comments, dispatch} = useContext(CommentsContext);
    let {postid} = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://my-blog-production-a226.up.railway.app/api/comments/replyingTo/${postid}`);
                const json = await response.json();

                if (response.ok) {
                    dispatch({type: 'SET_COMMENTS', payload: json});
                }
            } catch (err) {
                console.log(err);
            }
            
        }

        fetchComments();
    }, [postid, dispatch])


    return (
        <>
        <h1 className="text-2xl font-semibold">Moderate Comments</h1>
        {comments && comments.map(comment => (
            <Comment key={comment._id} comment={comment} postid={postid}/>
        ))}
        {(comments && comments.length === 0) &&
            <p>No comments on this article</p>
        }
        </>
    )
}

export default ModerateComments