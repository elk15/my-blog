import { useEffect } from "react";
import { useContext } from "react";
import Post from "../components/Post";
import { PostsContext } from "../context/PostsContext";

const Home = () => {
    const {posts, dispatch} = useContext(PostsContext);

    useEffect(() => {
        const fetchPosts = async () => {
            fetch('http://localhost:3001/api/posts/')
            .then((response) => {
                if (response.ok) {
                    console.log('Hello?')
                    return response.json();
                } else {
                    throw new Error("server error");
                }
            })
            .then((json) => dispatch({type: 'SET_POSTS', payload: json}))
            .catch((err) => console.log(err));
        }

        fetchPosts();
    }, [dispatch])

    return (
        <>
            <a href="" className="border border-neutral-300 p-2 rounded text-lg hover:bg-neutral-200">
                + Create a New Article
            </a>
            {posts && posts.map((post) => (
                <Post key={post._id} post={post}/>
                ))}
        </>
    )
}

export default Home;