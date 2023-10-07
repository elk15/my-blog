import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

const CreatePost = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
        <h2>Create a Post</h2>
        <form className="flex flex-col gap-2">
            <input type="text" maxLength={100} placeholder="Title"/>
            <textarea placeholder="Snippet" maxLength={300}></textarea>
            <Editor
                apiKey={import.meta.env.VITE_TINY_API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Hello, World!</p>"
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
            />
            <textarea placeholder="Tags (separated by commas)" maxLength={300}></textarea>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publish post?</span>
            </label>
        </form>
        <button onClick={log}>Log editor content</button>

        </>
    )
}

export default CreatePost