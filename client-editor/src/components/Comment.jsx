import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState } from 'react';
import { useContext } from 'react';
import { CommentsContext } from '../context/CommentsContext';

const Comment = ({comment}) => {
    const {dispatch} = useContext(CommentsContext);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/comments/${comment._id}`, {
            method: 'DELETE',
            })
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'DELETE_COMMENT', payload: json});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className='flex flex-col gap-3 border border-neutral-300 p-2 
        rounded max-w-[400px] w-full text-neutral-600'>
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
                    <button className='underline hover:text-neutral-900'>
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
    })
}

export default Comment

