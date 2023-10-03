import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const SearchBar = ({query, setQuery}) => {
    const theme = useContext(ThemeContext);

    return (
        <input type="text" 
        className={`border border-neutral-400 rounded p-2 max-w-lg focus:outline-teal-500 ml-1 
        ${theme === 'light' ? 'bg-white text-stone-900' : 'bg-stone-800 text-white border-none focus:outline-none'}`}
        placeholder='Search articles'
        value={query} onChange={(e) => setQuery(e.target.value)}/>
    )
}

SearchBar.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func
}

export default SearchBar;