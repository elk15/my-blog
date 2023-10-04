import { useState, useContext} from "react";
import MainContent from "../components/MainContent";
import { ServerDataContext } from '../context/ServerDataContext';
import PaginatedItems from "../components/PaginatedItems";

const Home = () => {
    const { posts } = useContext(ServerDataContext);
    const [query, setQuery] = useState('');

    return (
        <MainContent title={'All Posts'} query={query} setQuery={setQuery}>
            {posts &&
                <PaginatedItems itemsPerPage={5} posts={ posts } query={query}/>
            }  
        </MainContent>
    )
}

export default Home;