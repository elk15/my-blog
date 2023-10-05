import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <main className='flex-1 flex flex-col items-center gap-2 max-w-[800px] w-full'>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
