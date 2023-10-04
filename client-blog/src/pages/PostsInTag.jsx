import { useState, useContext} from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import MainContent from "../components/MainContent";
import { ServerDataContext } from '../context/ServerDataContext';
import { useEffect } from "react";

const PostsInTag = () => {
    const serverData = useContext(ServerDataContext);
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState(null)
    let {tag} = useParams();

    useEffect(() => {
        if (serverData.posts) {
            setPosts(serverData.posts.filter(post => post.tags.includes(tag)))
        }
    }, [serverData.posts, tag])

    const search = (post) => {
        if (post.title.toLowerCase().includes(query.toLowerCase())
        || post.body.toLowerCase().includes(query.toLowerCase())
        || post.tags.includes(query.toLowerCase())) {
            return true;
        }
        return false;
    }

    const title = tag.charAt(0).toUpperCase() + tag.slice(1);

    return (
        <MainContent title={title} query={query} setQuery={setQuery}>
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