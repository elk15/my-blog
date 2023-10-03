import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useState } from 'react';
import { useRef } from 'react';

const NavBar = ({toggleTheme}) => {
    const theme = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            mobileMenuRef.current.style.transform = 'translateX(-100%)';
        } else {
            setIsMenuOpen(true);
            mobileMenuRef.current.style.transform = 'translateX(0%)';
        }
    }

    return (
        <nav className='flex justify-between items-center max-w-[800px] w-full p-3 py-5 mx-auto'>
            <h1 className='font-semibold sm:text-2xl text-xl'>Full Stack Tutorials</h1>
            <ul className='flex  md:gap-10 gap-4 justify-center items-center text-lg'>
                <li className='hidden md:inline-block'>
                    <Link to="/"><h2>Blog</h2></Link>
                </li>
                <li className='hidden md:inline-block'>
                    <Link to="/tags"><h2>Tags</h2></Link>
                </li>
                <li className='hidden md:inline-block'>
                    <Link to="/about"><h2>About</h2></Link>
                </li>
                <li className='md:hidden flex items-center'>
                    <button className='material-symbols-outlined' onClick={toggleMenu}>
                        menu
                    </button>
                </li>
                <li className='flex items-center'>
                    <button className='material-symbols-outlined' aria-label='change-theme' onClick={toggleTheme}>
                         {theme === 'light' ? 'clear_night' : 'light_mode'}
                    </button>
                </li>
            </ul>
                <ul ref={mobileMenuRef} className={`fixed top-[68px] h-full w-full z-50 transition-transform 
                flex flex-col gap-10 items-center text-2xl 
                ${theme === 'light' ? ' bg-white text-stone-900' : ' bg-stone-900 text-white'}`} 
                style={{transform: 'translateX(-100%)'}}>
                    <li>
                        <Link to="/"><h2>Blog</h2></Link>
                    </li>
                    <li>
                        <Link to="/tags"><h2>Tags</h2></Link>
                    </li>
                    <li>
                        <Link to="/about"><h2>About</h2></Link>
                    </li>
                </ul>
            
        </nav>
    )
}

NavBar.propTypes = {
    toggleTheme: PropTypes.func,
}

export default NavBar;