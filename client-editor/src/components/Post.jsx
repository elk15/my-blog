import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from "react-router-dom";

const Post = ({post}) => {
    return (
    <section className='border border-neutral-300 p-3 rounded max-w-[500px] w-full'>
        <div className='flex flex-col md:flex-row justify-between text-neutral-600'>
            <p> 
                <span className="font-semibold">Created at: </span> 
                {format(new Date(post.createdAt), 'dd/MM/yy')}
            </p>
            <p>
                <span className="font-semibold">Last updated at: </span>
                {format(new Date(post.updatedAt), 'dd/MM/yy')}
            </p>
            <p>
                {post.isPublished ? 
                <span className='text-green-500'>Published</span> :
                <span className='text-red-500'>Unpublished</span>}
            </p>
        </div>
        <h2 className='text-xl font-semibold'>{post.title}</h2>
        <p className='text-neutral-500'>{post.snippet}</p>
        <span className='text-teal-500 font-semibold'>{post.tags.map(tag => tag.toUpperCase() + " ")}</span>
        <div className='flex gap-3 underline text-neutral-600'>
            <Link to="" className='hover:text-black'>
                Moderate Comments
            </Link>
            <Link to="" className='hover:text-black'>
                Update
            </Link>
            <Link to="" className='hover:text-black'>
                Delete
            </Link>
        </div>
    </section>
    )
    
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        snippet: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        isPublished: PropTypes.bool,
    })
}

export default Post;