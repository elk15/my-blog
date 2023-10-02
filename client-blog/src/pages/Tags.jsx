import MainContent from "../components/MainContent";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Tags = () => {
    const [tags, setTags] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await fetch('http://localhost:3001/api/posts/tags');
            const json = await response.json();

            if (response.ok) {
                setTags(json);
            }
        }

        fetchTags();
    }, [])

    return (
        <MainContent title={'Tags'}>
            <div className="flex flex-wrap gap-4">
                {tags && Object.keys(tags).map(key => {
                    return <span className="text-teal-500 font-semibold" key={key}>
                                <Link to={`/tags/${key}`}>{key.toUpperCase()} <span className="text-neutral-400 font-normal">({tags[key]})</span></Link>
                            </span>
                })}
            </div>
        </MainContent>
    )
}

export default Tags;