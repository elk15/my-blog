import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import MainContent from "../components/MainContent";

const PostsInTag = () => {
    const [posts, setPosts] = useState(null);
    let {tag} = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:3001/api/posts/tags/${tag}`);
            const json = await response.json();

            if (response.ok) {
                setPosts(json);
            }
        }

        fetchPosts();
    }, [tag])

    return (
        <MainContent title={tag.toUpperCase()}>
            {posts && posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </MainContent>
    )
}

export default PostsInTag;