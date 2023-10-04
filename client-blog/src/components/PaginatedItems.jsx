import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import Post from './Post';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const PaginatedItems = ({ itemsPerPage, posts, query }) => {
  const theme = useContext(ThemeContext);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  const search = (post) => {
    if (post.title.toLowerCase().includes(query.toLowerCase())
    || post.body.toLowerCase().includes(query.toLowerCase())
    || post.tags.includes(query.toLowerCase())) {
        return true;
    }
    return false;
 }

  return (
    <>
    {query.length > 2 ?
        posts && posts
            .filter(post => search(post))
            .map((post) => (
                <Post key={post._id} post={post} />
            ))
        :
        <>
        {currentItems && currentItems.map((post) => (
            <Post key={post._id} post={post} />
            ))}
        <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName={"flex justify-between"}
        disabledClassName = {`${theme === 'light' ? 'text-neutral-400' : 'text-neutral-600'}`}
        pageLinkClassName = {`${theme === 'light' ? 'text-neutral-400' : 'text-neutral-600'}`}
        activeLinkClassName = {`${theme === 'light' ? 'text-neutral-700' : 'text-white'}`}
        />
        </>
    }
      
    </>
  );
}

PaginatedItems.propTypes = {
    itemsPerPage: PropTypes.number,
    posts: PropTypes.array,
    query: PropTypes.string,
}



export default PaginatedItems;
