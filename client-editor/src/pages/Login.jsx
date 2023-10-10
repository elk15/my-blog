import { useState } from "react"
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, errors, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className="flex flex-col gap-3 items-center p-3 rounded shadow-md" 
        onSubmit={handleSubmit}>
            <h3 className="font-semibold text-2xl mb-4">
                Log in
            </h3>
            
            <input
            className="border border-neutral-200 p-1 focus:outline-teal-500"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />

            <input
            className="border border-neutral-200 p-1 focus:outline-teal-500"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            {errors && 
                <div className="border border-red-500 bg-red-200 p-2 rounded mt-4 
                w-full text-center">
                    {errors.map((err) => (
                        <div key={err.msg} className="text-red-500">
                            {err.msg}
                        </div>
                    ))}
                </div>
            }

            <button 
            disabled={isLoading} 
            type="submit"
            className="mt-2 border border-neutral-400 px-2 py-1 rounded
            hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-colors">
                Log in
            </button>
            
        </form>
    )
}

export default Login;