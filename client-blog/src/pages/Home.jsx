import { useState, useContext} from "react";
import Post from "../components/Post";
import MainContent from "../components/MainContent";
import { ServerDataContext } from '../context/ServerDataContext';

const Home = () => {
    const { posts } = useContext(ServerDataContext);
    const [query, setQuery] = useState('');

    const search = (post) => {
        if (post.title.toLowerCase().includes(query.toLowerCase())
        || post.body.toLowerCase().includes(query.toLowerCase())
        || post.tags.includes(query.toLowerCase())) {
            return true;
        }
        return false;
    }

    return (
        <MainContent title={'All Posts'} query={query} setQuery={setQuery}>
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

export default Home;