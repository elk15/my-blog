import { useParams } from "react-router-dom";
import { useContext} from "react";
import { ThemeContext } from '../context/ThemeContext';
import { format, compareDesc } from 'date-fns';
import { Link } from "react-router-dom";
import { ServerDataContext } from '../context/ServerDataContext';
import { useState } from "react";
import { useEffect } from "react";
import CommentForm from "../components/CommentForm";
import parse from 'html-react-parser';

const PostPage = () => {
    let {postid} = useParams();

    const theme = useContext(ThemeContext);

    const serverData = useContext(ServerDataContext);
    const [post, setPost] = useState(null);
    const [nextPost, setNextPost] = useState(null);
    const [prevPost, setPrevPost] = useState(null);
    const [comments, setComments] = useState(null);

    const [isCommentFormOpen, setCommentFormStatus] = useState(false);

    useEffect(() => {
        if (serverData.posts) {
            const postIndex = serverData.posts.findIndex(post => post._id === postid);
            setPost(serverData.posts[postIndex])
            setPrevPost(serverData.posts[postIndex - 1])
            setNextPost(serverData.posts[postIndex + 1])
        }
    
        if (serverData.comments) {
            setComments(serverData.comments.filter(comment => comment.replyingTo === postid))
        }
    }, [postid, serverData.comments, serverData.posts])

    useEffect(() => {
        setCommentFormStatus(false);
    }, [postid])
    
    return (
        <div className="flex flex-col items-center gap-3 max-w-[800px] w-full px-3 pt-5 pb-20">
            {post &&
            <>
                <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {format(new Date(post.createdAt), 'dd MMM yyyy')}
                </p>
                <h3 className="font-bold text-4xl">{post.title}</h3>
                <hr className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full mb-2`}/>
                <div className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-200'} text-lg self-start flex flex-col gap-4`}>
                    {parse(post.body)}
                </div>
                <hr className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full my-2`}/>
                <section className="self-start">
                    <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                        TAGS
                    </p>
                    <div className="text-teal-500 flex gap-2 font-semibold">
                        {post.tags.map(tag => <span key={tag}> <Link to={`/tags/${tag}`}>{tag.toUpperCase()}</Link> </span>)}
                    </div>
                </section>
                <section className="self-start w-full flex justify-between">
                    <div>
                        {prevPost &&
                        <>
                        <span className={`${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'} font-semibold`}>
                            PREVIOUS ARTICLE
                        </span>
                        <p className="text-teal-500">
                            <Link to={`/${prevPost._id}`}>{[prevPost.title]}</Link>
                        </p>
                        </>
                        }
                    </div>
                    <div>
                        {nextPost &&
                        <>
                        <span className={`${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'} font-semibold`}>
                            NEXT ARTICLE
                        </span>
                        <p className="text-teal-500">
                        <Link to={`/${nextPost._id}`}>{[nextPost.title]}</Link>
                        </p>
                        </>
                        }  
                    </div>
                </section>
                <section className="self-start text-teal-500">
                    <Link to='/'>
                        <p>← Back to the blog</p>
                    </Link>
                </section>
                <hr className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full my-2`}/>
                <section className={`${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'} w-full flex flex-col gap-4`}>
                        {isCommentFormOpen ?
                        <CommentForm postid={postid} setCommentFormStatus={setCommentFormStatus}/>
                        :
                        <button className={`${theme === 'light' ? 'border-neutral-200 hover:bg-neutral-100' : 'border-neutral-700 hover:bg-stone-800'} 
                        w-full border p-3 rounded`} onClick={() => setCommentFormStatus(true)}>
                            Add a comment
                        </button>
                        } 
                        {comments &&
                        comments
                        .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
                        .map(comment => (
                            <div key={comment._id} 
                            className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full border p-3 rounded`}>
                                <div className="flex justify-between">
                                    <p className="font-semibold">{comment.name}</p>
                                    <p>{format(new Date(comment.createdAt), 'dd MMM yyyy')}</p>
                                </div>
                                <p>{comment.body}</p>
                            </div>
                        ))

                        }
                </section>

            </> 
            }
            
        </div>
    )
}

export default PostPage;