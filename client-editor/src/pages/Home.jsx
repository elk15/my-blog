import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { PostsContext } from "../context/PostsContext";

const Home = () => {
    const {posts, dispatch} = useContext(PostsContext);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            fetch('http://localhost:3001/api/posts/')
            .then((response) => {
                if (response.ok) {
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

    const search = (query, post) => {
        if(post.title.toLowerCase().includes(query.toLowerCase()) 
        || post.body.toLowerCase().includes(query.toLowerCase())
        || post.snippet.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        return false;
    }

    return (
        <>
            <Link to="/create" className="border border-neutral-300 p-2 rounded text-lg hover:bg-neutral-200">
                + Create a New Article
            </Link>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            className='border border-neutral-300 p-2 rounded w-1/2' placeholder="Search"/>
            {query.length > 2 ?
                posts && posts
                    .filter(post => search(query, post))
                    .map((post) => (
                    <Post key={post._id} post={post}/>
                    ))
            :
                posts && posts.map((post) => (
                    <Post key={post._id} post={post}/>
                    ))
                }
        </>
    )
}

export default Home;