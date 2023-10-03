import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const MainContent = ({title, children, query, setQuery = null}) => {
    return (
        <div className="flex flex-col gap-5 max-w-[800px] w-full px-3 pt-5">
            <h3 className="md:text-5xl text-4xl font-extrabold tracking-tight">
                {title}
            </h3>
            {setQuery &&
            <SearchBar query={query} setQuery={setQuery}/>
            }
            <hr className="border-neutral-400 w-full"/>
            {children}
        </div>
    )
}

MainContent.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    query: PropTypes.string,
    setQuery: PropTypes.func,
}

export default MainContent;