import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import MainContent from "../components/MainContent";

const PostsInTag = () => {
    const [posts, setPosts] = useState(null);
    const [query, setQuery] = useState('');
    let {tag} = useParams();

    const search = (post) => {
        if (post.title.toLowerCase().includes(query.toLowerCase())
        || post.body.toLowerCase().includes(query.toLowerCase())
        || post.tags.includes(query.toLowerCase())) {
            return true;
        }
        return false;
    }

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
        <MainContent title={tag.toUpperCase()} query={query} setQuery={setQuery}>
            {query.length > 2 ?
                posts && posts
                .filter(post => search(post))
                .map((post) => (
                    <Post key={post._id} post={post} />
                ))
            :
                posts && posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))
            }
        </MainContent>
    )
}

export default PostsInTag;