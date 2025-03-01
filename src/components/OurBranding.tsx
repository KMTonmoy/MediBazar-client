import React from 'react';
import logo from '../../public/logo.webp'; // Assuming you have a logo for Medibazar
import Image from 'next/image';

const Branding = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">

                {/* Brand Logo & Name Section */}
                <div className="flex flex-col items-center lg:items-start space-y-4">
                    <Image
                        width={200}
                        src={logo}
                        alt="Medibazar Logo"
                        className="  object-contain animate-pulse transform transition duration-500 hover:scale-110"
                    />

                    <p className="text-lg max-w-xs text-center lg:text-left animate__animated animate__fadeIn animate__delay-1.5s">
                        Empowering innovation through creativity and technology. We bring your healthcare ideas to life.
                    </p>
                </div>

                {/* Brand Message & CTA Section */}
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-2s">
                        We Make Your Vision a Reality
                    </h2>
                    <p className="text-lg mb-6 max-w-lg mx-auto lg:mx-0 animate__animated animate__fadeIn animate__delay-2.5s">
                        Our products and services are designed to help you succeed. From innovative healthcare solutions to customer-centric designs, we’re committed to delivering excellence.
                    </p>
                    <button className="bg-yellow-500 text-black py-3 px-8 rounded-full font-semibold hover:bg-yellow-400 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Branding;
