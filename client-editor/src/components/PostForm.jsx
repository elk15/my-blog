import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

const PostForm = ({post, setPost, handleSubmit, errors}) => {
    const editorRef = useRef(null);

    console.log(import.meta.env.VITE_TINY_API_KEY)

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input type="text" maxLength={100} placeholder="Title" required
            className="border border-neutral-300 p-2 rounded focus:outline-teal-500"
            onChange={(e) => setPost({...post, title: e.target.value})}
            value={post.title}/>
            <textarea placeholder="Snippet" maxLength={300} required
            className="border border-neutral-300 p-2 rounded focus:outline-teal-500"
            onChange={(e) => setPost({...post, snippet: e.target.value})}
            value={post.snippet}></textarea>
            <Editor
                apiKey={import.meta.env.VITE_TINY_API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={(value, editor) => setPost({...post, body: value})}
                value={post.body}
            />
            <textarea placeholder="Tags (separated by commas ex: react, javascript, testing)" maxLength={300}
            className="border border-neutral-300 p-2 rounded focus:outline-teal-500"
            onChange={(e) => setPost({...post, tags: e.target.value})}
            value={post.tags}></textarea>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" 
                checked={post.isPublished}
                onChange={() => setPost({...post, isPublished: !post.isPublished})}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
                 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-semibold text-gray-900">Publish post?</span>
            </label>
            {errors &&
            <div className="flex flex-col">
                {errors.map((err) => (
                    <div key={err.msg} className="text-red-500">{err.msg}</div>
                ))}
            </div>
            }
            <button type="submit" className="border border-neutral-300 rounded py-1 px-2 text-xl font-semibold
            hover:bg-green-500 hover:text-white hover:border-green-500 transition-colors">
                Save
            </button>
        </form>
    )
}

PostForm.propTypes = {
    post : PropTypes.shape({
        title: PropTypes.string,
        snippet: PropTypes.string,
        body: PropTypes.string,
        tags: PropTypes.string,
        isPublished: PropTypes.bool,
    }),
    setPost: PropTypes.func,
    handleSubmit: PropTypes.func,
    errors: PropTypes.array,
}

export default PostForm;