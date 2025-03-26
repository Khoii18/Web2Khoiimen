import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password_1, setPassword_1] = useState('');
    const [password_2, setPassword_2] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/register', {
                username,
                email,
                phone,
                password_1,
                password_2,
                dob
            });

            if (data.success) {
                console.log('Account created');
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
                <form className="space-y-4" onSubmit={signUp}>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your username"
                        />
                    </div>
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
                        <label className="block text-gray-600 mb-1" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            id="phone"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="dob">
                            Date of Birth
                        </label>
                        <input
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            type="date"
                            id="dob"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="password_1">
                            Password
                        </label>
                        <input
                            value={password_1}
                            onChange={(e) => setPassword_1(e.target.value)}
                            type="password"
                            id="password_1"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Create a password"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="password_2">
                            Confirm Password
                        </label>
                        <input
                            value={password_2}
                            onChange={(e) => setPassword_2(e.target.value)}
                            type="password"
                            id="password_2"
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an account? 
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;