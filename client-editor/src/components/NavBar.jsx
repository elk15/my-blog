const NavBar = () => {
    return (
        <header className="w-full flex justify-center p-3 border">
            <div className="flex justify-between max-w-[800px] w-full items-center">
                <h1 className="font-semibold text-xl">Blog Editor</h1>
                <button className="bg-stone-900 text-white py-1 px-2 rounded text-lg">
                    Log In
                </button>
            </div>
        </header>
    )
}

export default NavBar;