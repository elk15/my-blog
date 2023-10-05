import PropTypes from 'prop-types';

const Post = ({post}) => {
    return (
    <section>
        <div>
            <p>Created at: {post.createdAt}</p>
            <p>Last updated at: {post.updatedAt}</p>
        </div>
        <h2>{post.title}</h2>
        <p>{post.snippet}</p>
        <span>{post.tags.map(tag => tag.toUpperCase() + " ")}</span>
        <div>
            <a href="">Moderate Comments</a>
            <a href="">Update</a>
            <a href="">Delete</a>
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
    })
}

export default Post;