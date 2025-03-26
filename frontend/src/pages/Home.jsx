/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Banner */}
            <motion.div
            className="container mx-auto px-4 mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Background animation */}
            <motion.div
                className="relative bg-orange-500 text-white py-16 rounded-lg text-center overflow-hidden"
                style={{
                    backgroundImage: `url('https://source.unsplash.com/1600x900/?fashion')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                {/* Overlay để làm mờ ảnh nền */}
                <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>

                {/* Nội dung Banner */}
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4">
                        MASSIVE SALE!
                    </h2>
                    <p className="text-xl mb-6">
                        SPORTSWEAR UP TO <span className="font-bold">50% OFF</span>
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
                    >
                        Shop Now
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>

            {/* Product List */}
            <div className="container mx-auto px-4 mt-10">
                <h3 className="text-2xl font-bold mb-6">Featured Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Products */}
                    {[
                        { name: 'Men’s T-Shirt', price: '$25', img: 'https://i.pinimg.com/originals/98/07/2d/98072d2ed9a29ffe5d6880bf996c2040.jpg' },
                        { name: 'Women’s Jeans', price: '$35', img: 'https://www.warehouseone.com/on/demandware.static/-/Sites-warehouseone-master/default/dwb3477a0c/who/1210600376~090~1.jpg?sw=690&sh=920&sm=fit&q=88' },
                        { name: 'Hoodie', price: '$40', img: 'https://th.bing.com/th/id/OIP.AJsooEY9F8I1pr-wo3QR5QHaLH?w=204&h=306&c=7&r=0&o=5&dpr=2.5&pid=1.7' },
                        { name: 'Dress', price: '$50', img: 'https://img.ltwebstatic.com/images3_pi/2023/04/18/1681788012ce6ce5afd00c42cc9da9d00ff80d8942_thumbnail_600x.jpg' }
                    ].map((product, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
                            <img src={product.img} alt={product.name} className="w-full h-auto mb-4 rounded-md" />
                            <h4 className="text-lg font-bold">{product.name}</h4>
                            <p className="text-gray-600">{product.price}</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;