import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Tags from './pages/Tags';
import NavBar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <>
      <BrowserRouter>
        <header className={'w-full' 
        + (theme === 'light' ? ' bg-white text-stone-900' : ' bg-stone-900 text-white')}>
          <NavBar toggleTheme={toggleTheme} theme={theme}/>
        </header>
        <main className={'flex flex-col gap-2 w-full items-center'
        + (theme === 'light' ? ' bg-white text-stone-900' : ' bg-stone-900 text-white')}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/tags' element={<Tags />}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
