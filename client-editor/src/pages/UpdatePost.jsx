import { useState, useContext } from "react"
import PostForm from "../components/PostForm"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const UpdatePost = () => {
    const [post, setPost] = useState(null)
    const [errors, setErrors] = useState(null);
    const [getError, setGetError] = useState(null);
    const navigate = useNavigate();
    let {postid} = useParams();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${postid}`);
                const json = await response.json();

                if (response.ok) {
                    setPost({
                        title: json.title,
                        snippet: json.snippet,
                        body: json.body,
                        tags: json.tags.join(", "),
                        isPublished: json.isPublished,
                    })
                }

                if (!response.ok) {
                    setGetError(json.error)
                }
            } catch (err) {
                console.log(err);
            }
            
        }

        fetchPost();
    }, [postid])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postid}`, {
                method: 'PATCH',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if (!response.ok) {
                setErrors(json.errors);
            }

            if (response.ok) {
                setPost(null);
                setErrors(null);
                setGetError(null);
                navigate("/");
            }

            
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
        {getError ?
            <h2 className="text-2xl font-semibold">Post Not Found</h2>
        :
        post &&
            <>
            <h2 className="text-2xl font-semibold">Update a Post</h2>
            <PostForm 
            post={post} 
            setPost={setPost} 
            handleSubmit={handleSubmit}
            errors={errors}
            />
            </>                        
        }
        </>
    )
}

export default UpdatePost