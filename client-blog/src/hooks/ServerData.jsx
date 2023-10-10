import { useState, useEffect } from "react";

const useServerData = () => {
    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts/published`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("server error");
            }
        })
        .then((json) => setPosts(json))
        .catch((err) => console.log(err));

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/comments`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("server error");
            }
        })
        .then((json) => setComments(json))
        .catch((err) => console.log(err));
    }, [])

    return {posts, comments};
}

export default useServerData;