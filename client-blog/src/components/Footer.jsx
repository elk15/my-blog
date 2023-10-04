import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

const Footer = () => {
    const theme = useContext(ThemeContext);

    return (
        <footer className={`flex flex-col gap-1 p-3 items-center w-full
        ${theme === 'light' ? ' bg-white text-stone-900' : ' bg-stone-900 text-white'}`}>
            <div className="flex gap-3">
                <a href="https://github.com/elk15">
                    {theme === 'light' ?
                         <i className="devicon-github-original colored text-2xl"></i>
                    :
                        <i className="devicon-github-original text-2xl"></i>
                    }
                </a>
                <a href="https://www.linkedin.com/in/elina-papadimitriou-0bb235176/">
                    {theme === 'light' ?
                        <i className="devicon-linkedin-plain colored text-2xl"></i>
                    :
                        <i className="devicon-linkedin-plain text-2xl"></i>
                    }
                </a>
            </div>
            <div className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                © 2023 • elk145
            </div>
            <div className={`${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                All rights reserved.
            </div>
        </footer>
    )
}

export default Footer