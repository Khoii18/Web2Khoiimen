import axios from "axios";
import { useState } from "react";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL +'/api/user/login', { email, password });

            if (data.success) {
                console.log('Logged in');
            } else {
                console.log('Error logging in');
            }
        }
        catch {
            console.log('Error logging in!!!!!!!!');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>
                <form type="submit" className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={login}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
