import { useParams } from "react-router-dom";
import { useContext} from "react";
import { ThemeContext } from '../context/ThemeContext';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import { ServerDataContext } from '../context/ServerDataContext';

const PostPage = () => {
    let {postid} = useParams();
    const serverData = useContext(ServerDataContext);
    const theme = useContext(ThemeContext);

    const postIndex = serverData.posts.findIndex(post => post._id === postid);
    const post = serverData.posts[postIndex];
    const prevPost = serverData.posts[postIndex - 1];
    const nextPost = serverData.posts[postIndex + 1];

    const comments = serverData.comments.filter(comment => comment.replyingTo === postid);

    return (
        <div className="flex flex-col items-center gap-3 max-w-[650px] w-full px-3 pt-5">
            {post &&
            <>
                <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {format(new Date(post.createdAt), 'dd MMM yyyy')}
                </p>
                <h3 className="font-bold text-4xl">{post.title}</h3>
                <hr className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full mb-2`}/>
                <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-200'} text-lg self-start`}>
                    {post.body}
                </p>
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
                        <button className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full border p-3 rounded`}>
                            Add a comment
                        </button>
                        {comments &&
                        comments.map(comment => (
                            <div key={comment._id} 
                            className={`${theme === 'light' ? 'border-neutral-200' : 'border-neutral-700'} w-full border p-3 rounded`}>
                                <div className="flex justify-between">
                                    <p className="font-semibold">{comment.name}</p>
                                    <p>{format(new Date(post.createdAt), 'dd MMM yyyy')}</p>
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