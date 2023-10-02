import MainContent from "../components/MainContent";

const About = () => {
    return (
        <MainContent title={'About'}>
            <div className="text-xl">
                <h4 className="font-semibold">Elina Papadimitriou</h4>
                <span className="text-neutral-500"><strong>Full Stack Engineer</strong></span>
            </div>
            <p className="text-neutral-500 text-lg">
                I am a dedicated full-stack engineer with a strong preference for the <strong>MERN stack</strong>—MongoDB, Express, React, and Node.js. 
                However, my commitment to growth has led me to explore C# and ASP.NET. 
                I possess a profound appreciation for both the front-end and back-end aspects of web development.
            </p>
            <p className="text-neutral-500 text-lg">
                In particular, I find immense satisfaction in the creative process of designing user-friendly and aesthetically pleasing websites. 
                Among my favorite technologies are <strong>React, Python, and Tailwind</strong>, which I consider invaluable tools in my repertoire. 
                I am committed to continuous learning and actively share my knowledge with fellow enthusiasts.
            </p>
            <p className="text-neutral-500 text-lg">
                Additionally, I harbor a profound interest in <strong>deep learning and artificial intelligence</strong>, 
                which fuels my passion for the ever-evolving field of technology. 
                Join me on this journey as we delve into the realm of innovation and discovery.
            </p>
        </MainContent>
    )
}

export default About;