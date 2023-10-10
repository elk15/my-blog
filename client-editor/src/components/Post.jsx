import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { AuthContext } from "../context/AuthContext";

const Post = ({post}) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const { dispatch } = useContext(PostsContext);
    const {user} = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/${post._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if (response.ok) {
                setDeleteConfirm(false);
                dispatch({type: 'DELETE_POST', payload: json.post});
            }
        } catch (err) {
            console.log(err);
        }
    }

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
        <div className='flex flex-wrap gap-3 text-neutral-600'>
            <Link to={`/comments/${post._id}`} className='hover:text-black underline'>
                Moderate Comments
            </Link>
            <Link to={`/update/${post._id}`} className='hover:text-black underline'>
                Update
            </Link>
            {deleteConfirm ?
            <div>
                <p className='no-underline font-semibold'>
                    Are you sure you want to delete this?
                </p>
                <div className='flex gap-5'>
                    <button onClick={handleDelete}
                    className='text-red-500 font-bold text-lg underline'>
                        Yes
                    </button>
                    {" "}
                    <button onClick={() => setDeleteConfirm(false)}
                    className='text-lg underline'>
                        No
                    </button>
                </div>
            </div>
            :
            <button className='hover:text-black underline' onClick={() => setDeleteConfirm(true)}>
                Delete
            </button>
            }
            
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