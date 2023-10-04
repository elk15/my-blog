import { useState } from "react";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { ServerDataContext } from "../context/ServerDataContext";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";

const CommentForm = ({postid}) => {
    const {comments, setComments} = useContext(ServerDataContext);
    const theme = useContext(ThemeContext);

    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setName('');
        setBody('');
    }, [postid])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = {name, body, replyingTo: postid};

        const response = await fetch('http://localhost:3001/api/comments', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            setName('');
            setBody('');
            setComments([...comments, json]);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="text" 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={`${theme === 'light' ? 
                'border-neutral-200 bg-white text-stone-900' :
                'border-neutral-700 bg-stone-800 text-white outline-none'} 
                focus:outline-teal-500 w-full border p-3 rounded`}
            />

            <textarea 
            placeholder="Comment" 
            onChange={(e) => setBody(e.target.value)} 
            value={body} 
            className={`${theme === 'light' ? 
            'border-neutral-200 bg-white text-stone-900' : 
            'border-neutral-700 bg-stone-800 text-white outline-none'} 
            focus:outline-teal-500 w-full border p-3 rounded`}></textarea>

            {error && <div>{error}</div>}

            <button type="submit" 
            className={`${theme === 'light' ? 
            'border-neutral-200 hover:bg-neutral-100' : 
            'border-neutral-700 hover:bg-stone-800'} w-full border p-3 rounded`}>
                Submit
            </button>
        </form>
    )
}

CommentForm.propTypes ={
    postid: PropTypes.string,

}

export default CommentForm