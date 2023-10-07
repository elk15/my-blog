import PropTypes from 'prop-types';
import { format } from 'date-fns';

const Comment = ({comment}) => {

    return (
        <section>
            <p>{comment.name}</p>
            <p>{comment.body}</p>
            <div>
                <button>Update</button>
                <button>Delete</button>
                <span>
                    Created at: {format(new Date(comment.createdAt), 'dd/MM/yy')}
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

