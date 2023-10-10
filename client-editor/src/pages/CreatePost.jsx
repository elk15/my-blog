import { useState, useContext } from "react"
import PostForm from "../components/PostForm"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
    const [post, setPost] = useState({
        title: '',
        snippet: '',
        body: '<p>Hello, World!</p>',
        tags: '',
        isPublished: false,
    })
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/`, {
                method: 'POST',
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
                setPost({
                    title: '',
                    snippet: '',
                    body: '',
                    tags: '',
                    isPublished: false,
                })
                setErrors(null)
                navigate("/");
            }

            
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
        <h2 className="text-2xl font-semibold">Create a Post</h2>
        <PostForm 
        post={post} 
        setPost={setPost} 
        handleSubmit={handleSubmit}
        errors={errors}
        />
        </>
    )
}

export default CreatePost