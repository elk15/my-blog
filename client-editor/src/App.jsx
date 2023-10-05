import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <main>
        <Routes>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
