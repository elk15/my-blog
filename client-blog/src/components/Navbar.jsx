import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const NavBar = ({toggleTheme}) => {
    const theme = useContext(ThemeContext);

    return (
        <nav className='flex justify-between items-center max-w-[800px] w-full p-3 py-5 mx-auto'>
            <h1 className='font-semibold text-2xl'>Full Stack Tutorials</h1>
            <ul className='flex  gap-10 justify-center items-center text-lg'>
                <li>
                    <Link to="/"><h2>Blog</h2></Link>
                </li>
                <li>
                    <Link to="/tags"><h2>Tags</h2></Link>
                </li>
                <li>
                    <Link to="/about"><h2>About</h2></Link>
                </li>
                <li className='flex items-center'>
                    <button className='material-symbols-outlined' aria-label='change-theme' onClick={toggleTheme}>
                         {theme === 'light' ? 'clear_night' : 'light_mode'}
                    </button>
                </li>
            </ul>
        </nav>
    )
}

NavBar.propTypes = {
    toggleTheme: PropTypes.func,
}

export default NavBar;