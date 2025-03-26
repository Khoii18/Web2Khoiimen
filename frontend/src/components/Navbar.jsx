import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-yellow-400 py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <div className="text-2xl font-bold text-black">
                    Fyr Fashion
                </div>

                {/* Nav Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/"
                            className={`hover:text-gray-700 ${
                                location.pathname === '/' ? 'border-b-2 border-black' : ''
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className={`hover:text-gray-700 ${
                                location.pathname === '/products' ? 'border-b-2 border-black' : ''
                            }`}
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`hover:text-gray-700 ${
                                location.pathname === '/contact' ? 'border-b-2 border-black' : ''
                            }`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Search and Actions */}
                <div className="flex space-x-4 items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border px-4 py-2 rounded-lg"
                    />
                    <Link
                        to="/login"
                        className="text-black hover:text-gray-700 transition"
                    >
                        Sign In
                    </Link>
                    <button className="text-black hover:text-gray-700 transition">
                        Cart
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;