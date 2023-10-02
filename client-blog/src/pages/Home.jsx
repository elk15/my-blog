import { useState, useEffect } from "react";
import Post from "../components/Post";
import MainContent from "../components/MainContent";

const Home = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:3001/api/posts');
            const json = await response.json();

            if (response.ok) {
                setPosts(json);
            }
        }

        fetchPosts();
    }, [])

    return (
        <MainContent title={'All Posts'}>
            {posts && posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </MainContent>
    )
}

export default Home;