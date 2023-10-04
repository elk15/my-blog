import { useEffect } from 'react';
import { createContext, useState } from 'react';
import useServerData from '../hooks/ServerData';

export const ServerDataContext = createContext({
    posts: null,
    comments: null,
});

export const ServerDataContextProvider = ({children}) => {
    const serverData = useServerData();
    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        if (serverData.posts) setPosts(serverData.posts);
        if (serverData.comments) setComments(serverData.comments);
    }, [serverData.posts, serverData.comments]);
    

    return (
        <ServerDataContext.Provider value={{posts, comments, setComments}}>
            { children }
        </ServerDataContext.Provider>
    )
}