import PropTypes from 'prop-types';

const MainContent = ({title, children}) => {
    return (
        <div className="flex flex-col gap-5 max-w-[800px] w-full px-3 pt-5">
            <h3 className="md:text-5xl text-4xl font-extrabold tracking-tight">
                {title}
            </h3>
            <hr className="border-neutral-400 w-full"/>
            {children}
        </div>
    )
}

MainContent.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
}

export default MainContent;