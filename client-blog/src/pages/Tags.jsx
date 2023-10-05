import MainContent from "../components/MainContent";
import { Link } from 'react-router-dom';
import { useContext} from "react";
import { ThemeContext } from '../context/ThemeContext';
import { ServerDataContext } from '../context/ServerDataContext';
import { useEffect } from "react";
import { useState } from "react";

// Sort tags alphabetically 
const sortTagsAlphabetically = (obj) => {
    const keys = Object.keys(obj).sort();
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};

// Retrieve tags from post data
const getTags = (posts) => {
    let tags = {};
    posts.forEach(post => {
        post.tags.forEach(tag => {
            if (Object.keys(tags).includes(tag)) {
                tags[tag] += 1;
            } else {
                tags[tag] = 1;
            }
        })
    })
    return sortTagsAlphabetically(tags);
}

const Tags = () => {
    const { posts } = useContext(ServerDataContext);
    const theme = useContext(ThemeContext);
    const [tags, setTags] = useState(null);

    useEffect(() => {
        if (posts) {
            setTags(getTags(posts))
        }
    }, [posts])

    return (
        <MainContent title={'Tags'}>
            <div className="flex flex-wrap gap-4">
                {tags && Object.keys(tags).map(key => {
                    return <span className="text-teal-500 font-semibold" key={key} role="tag">
                                <Link to={`/tags/${key}`}>
                                    {key.toUpperCase()} <span className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'} font-normal`}>({tags[key]})</span>
                                </Link>
                            </span>
                })}
            </div>
        </MainContent>
    )
}

export default Tags;