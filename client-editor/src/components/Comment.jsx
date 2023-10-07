import PropTypes from 'prop-types';
import { format } from 'date-fns';

const Comment = ({comment}) => {

    return (
        <section className='flex flex-col gap-3 border border-neutral-300 p-2 
        rounded max-w-[400px] w-full text-neutral-600'>
            <p className='text-lg font-semibold'>{comment.name}</p>
            <p>{comment.body}</p>
            <div className='flex flex-wrap gap-2'>
                <button className='underline hover:bg-neutral-900'>
                    Update
                </button>
                <button className='underline hover:bg-neutral-900'>
                    Delete
                </button>
                <span>
                    <strong>Created at: </strong>
                    {format(new Date(comment.createdAt), 'dd/MM/yy')}
                </span>
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

