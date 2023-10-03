import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Tags from './pages/Tags';
import PostsInTag from './pages/PostsInTag';
import PostPage from './pages/PostPage';
import NavBar from './components/Navbar';
import { useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { ServerDataContext } from './context/ServerDataContext';
import useServerData from './hooks/ServerData';

function App() {
  const [theme, setTheme] = useState('light');
  const serverData = useServerData();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <>
    <ServerDataContext.Provider value={serverData}>
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <header className={'w-full' 
        + (theme === 'light' ? ' bg-white text-stone-900' : ' bg-stone-900 text-white')}>
          <NavBar toggleTheme={toggleTheme}/>
        </header>
        <main className={'flex flex-col gap-2 w-full items-center'
        + (theme === 'light' ? ' bg-white text-stone-900' : ' bg-stone-900 text-white')}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/tags' element={<Tags />}/>
            <Route path='/tags/:tag' element={<PostsInTag/>}/>
            <Route path='/:postid' element={<PostPage/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeContext.Provider>
    </ServerDataContext.Provider>
    </>
  )
}

export default App
