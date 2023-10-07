import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

const ModerateComments = () => {
    const [comments, setComments] = useState(null);
    let {postid} = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/comments/replyingTo/${postid}`);
                const json = await response.json();

                if (response.ok) {
                    setComments(json);
                }
            } catch (err) {
                console.log(err);
            }
            
        }

        fetchComments();
    }, [postid])


    return (
        <>
        <h1 className="text-2xl font-semibold">Moderate Comments</h1>
        {comments && comments.map(comment => (
            <Comment key={comment._id} comment={comment}/>
        ))}
        </>
    )
}

export default ModerateComments