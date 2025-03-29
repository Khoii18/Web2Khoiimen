import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import FontAwesome

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login', { email, password });

            if (data.success) {
                console.log('Logged in');
                navigate('/');
            } else {
                setError(data.message || 'Error logging in');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background bằng hình ảnh */}
            <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url('https://lavenderstudio.com.vn/wp-content/uploads/2019/07/chup-anh-cua-hang-thoi-trang-2-1024x683.png')`, // Đường dẫn ảnh
                }}
            ></div>

            {/* Overlay để làm mờ nền (tuỳ chỉnh theo ý muốn) */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
            >
                {/* Tiêu đề */}
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>

                {/* Hiển thị lỗi */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 text-red-500 text-sm text-center bg-red-100 border border-red-400 rounded-lg p-2"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form đăng nhập */}
                <form className="space-y-6" onSubmit={login}>
                    {/* Email */}
                    <div className="relative">
                        <label className="block text-gray-600 mb-1" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 transition-shadow shadow-sm hover:shadow-md">
                            <FaEnvelope className="text-gray-400 ml-3" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full p-3 bg-transparent border-none focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-600 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 transition-shadow shadow-sm hover:shadow-md">
                            <FaLock className="text-gray-400 ml-3" />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full p-3 bg-transparent border-none focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {/* Button Đăng nhập */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        Sign In 🚀
                    </motion.button>
                </form>

                {/* Link chuyển tới trang đăng ký */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;