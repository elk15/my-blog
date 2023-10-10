import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { CommentsContextProvider } from './context/CommentsContext.jsx'
import { PostsContextProvider } from './context/PostsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <PostsContextProvider>
    <CommentsContextProvider>
      <App />
    </CommentsContextProvider>
    </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
