import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <main className='flex-1 flex flex-col items-center gap-4 max-w-[800px] w-full'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/create' element={<CreatePost />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
