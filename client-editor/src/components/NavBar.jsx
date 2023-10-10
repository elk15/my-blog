import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const {logout} = useLogout();
    const { user } = useContext(AuthContext);
    return (
        <header className="w-full flex justify-center p-3 border mb-2">
            <div className="flex justify-between max-w-[800px] w-full items-center">
                <h1 className="font-semibold text-xl"><Link to="/">Blog Editor</Link></h1>
                {user && 
                    <button 
                    onClick={() => logout()}
                    className="bg-stone-900 text-white py-1 px-2 rounded text-lg">
                        Log Out
                    </button>
                }
                {!user && 
                    <Link to="/login" className="bg-stone-900 text-white py-1 px-2 rounded text-lg">
                        Log In
                    </Link>
                }
            </div>
        </header>
    )
}

export default NavBar;