import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Home from './pages/Home';
import ModerateComments from './pages/ModerateComments';

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <main className='flex-1 flex flex-col items-center gap-4 max-w-[800px] w-full'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/update/:postid' element={<UpdatePost />}/>
          <Route path='/comments/:postid' element={<ModerateComments />}/>
          <Route path='/create' element={<CreatePost />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
