import { createContext } from 'react';

export const ServerDataContext = createContext({
    posts: null,
    comments: null,
});