import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    return (
        <section className='flex flex-col gap-1 text-lg'>
            <p className='text-neutral-600'>
                {format(new Date(post.createdAt), 'dd MMM yyyy')}
            </p>
            <div>
                <h4 className='font-semibold text-2xl'>
                    <Link to={`${post._id}`}>{post.title}</Link> 
                </h4>
                <div className='text-teal-500 flex gap-2 font-semibold'>
                    {post.tags.map(tag => <span key={tag}> <Link to={`/tags/${tag}`}>{tag.toUpperCase()}</Link> </span>)}
                </div>
            </div>
            <p className='text-neutral-500'>
                {post.snippet}
            </p>
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
    })

}

export default Post;