import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState } from 'react';
import { useContext } from 'react';
import { CommentsContext } from '../context/CommentsContext';
import { AuthContext } from "../context/AuthContext";

const Comment = ({comment, postid}) => {
    const {dispatch} = useContext(CommentsContext);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [updatedComment, setUpdatedComment]  = useState(comment);
    const [errors, setErrors] = useState(null);
    const {user} = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/comments/${comment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'DELETE_COMMENT', payload: json});
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            updatedComment.replyingTo = postid;
            const response = await fetch(`http://localhost:3001/api/comments/${comment._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedComment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if (!response.ok) {
                setErrors(json.errors);
            }

            if (response.ok) {
                setErrors(null);
                setUpdateMode(false);
                dispatch({type: 'UPDATE_COMMENT', payload: json});
                setUpdatedComment(json);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleCancelUpdate = () => {
        setUpdateMode(false);
        setUpdatedComment(comment);
        setErrors(null);
    }

    return (
        <section className='flex flex-col gap-3 border border-neutral-300 p-2 
        rounded max-w-[400px] w-full text-neutral-600'>
            {updateMode ?
            <>
                <input type="text" 
                onChange={(e) => setUpdatedComment({...updatedComment, name: e.target.value})}
                value={updatedComment.name}
                placeholder="Name"
                className='border border-neutral-300 p-2 focus:outline-teal-500 rounded w-full' 
                />
                <input type="text" 
                onChange={(e) => setUpdatedComment({...updatedComment, body: e.target.value})}
                value={updatedComment.body}
                placeholder="Comment"
                className='border border-neutral-300 p-2 focus:outline-teal-500 rounded w-full'
                />
                {errors &&
                    <ul className='text-red-500'>
                        {errors.map(err => (
                            <li key={err.msg}>{err.msg}</li>
                        ))}
                    </ul>
                }
                <button onClick={handleUpdate}
                className='border border-neutral-300 p-2 hover:bg-green-500 hover:text-white 
                transition-colors rounded w-3/4 self-center'>
                    Update
                </button>
                <button onClick={handleCancelUpdate} 
                className='border border-neutral-300 p-2 hover:bg-neutral-200 
                transition-colors rounded w-3/4 self-center'>
                    Cancel
                </button>
            </>
            :
            <>
                <p className='text-lg font-semibold'>{comment.name}</p>
                <p>{comment.body}</p>
                <div className='flex flex-wrap gap-2'>
                    {confirmDelete ?
                    <>
                        <p className='font-semibold'>
                            Are you sure you want to delete this comment?
                        </p>
                        <button className='underline text-red-500'
                        onClick={handleDelete}>
                            Yes
                        </button>
                        <button className='underline'
                        onClick={() => setConfirmDelete(false)}>
                            No
                        </button>
                    </>
                    :
                    <>
                        <button className='underline hover:text-neutral-900'
                        onClick={() => setUpdateMode(true)}>
                            Update
                        </button>
                        <button className='underline hover:text-neutral-900'
                        onClick={() => setConfirmDelete(true)}>
                            Delete
                        </button>
                        <span>
                            <strong>Created at: </strong>
                            {format(new Date(comment.createdAt), 'dd/MM/yy')}
                        </span>
                    </>
                    }
                </div>
            </>
            }
        </section>
    )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        body: PropTypes.string,
        replyingTo: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
    }),
    postid: PropTypes.string,
}

export default Comment

