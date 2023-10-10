import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NavBar from './components/NavBar';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import UpdatePost from './pages/UpdatePost';
import Home from './pages/Home';
import ModerateComments from './pages/ModerateComments';

function App() {
  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <NavBar/>
      <main className='flex-1 flex flex-col items-center gap-4 max-w-[800px] w-full'>
        <Routes>
          <Route 
            path='/' 
            element={user ? <Home/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/login' 
            element={!user ? <Login/> : <Navigate to="/"/>}
          />
          <Route 
            path='/update/:postid' 
            element={user ? <UpdatePost/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/comments/:postid' 
            element={user ? <ModerateComments/> : <Navigate to="/login"/>}
          />
          <Route 
            path='/create' 
            element={user ? <CreatePost /> : <Navigate to="/login"/>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
