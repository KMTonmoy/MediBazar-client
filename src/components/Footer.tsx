'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold mb-4 text-[#95C0FE]">Medibazar</h3>
                        <p className="text-lg mb-4">
                            Medibazar is your trusted platform for all healthcare needs.
                            We aim to provide the best services, connecting people with the best healthcare solutions.
                        </p>
                        <p className="text-sm mt-6">
                            &copy; {new Date().getFullYear()} Medibazar. All Rights Reserved.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-[#95C0FE]">Quick Links</h3>
                        <ul className="space-y-3">
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href="#home" className="hover:text-[#95C0FE] transition-colors duration-300">Home</a>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href="#about" className="hover:text-[#95C0FE] transition-colors duration-300">About Us</a>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href="#services" className="hover:text-[#95C0FE] transition-colors duration-300">Services</a>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href="#contact" className="hover:text-[#95C0FE] transition-colors duration-300">Contact Us</a>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Follow Us */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-[#95C0FE]">Follow Us</h3>
                        <div className="flex space-x-6">
                            <motion.a
                                href="https://www.facebook.com"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="hover:text-[#95C0FE]"
                            >
                                <FaFacebookSquare className="text-2xl" />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="hover:text-[#95C0FE]"
                            >
                                <FaInstagram className="text-2xl" />
                            </motion.a>
                            <motion.a
                                href="https://www.twitter.com"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="hover:text-[#95C0FE]"
                            >
                                <FaTwitter className="text-2xl" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="hover:text-[#95C0FE]"
                            >
                                <FaLinkedin className="text-2xl" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-10 text-center"
                >
                    <p className="text-sm">
                        For any inquiries, email us at{' '}
                        <a href="mailto:contact@medibazar.com" className="hover:text-[#95C0FE] transition-colors duration-300">
                            contact@medibazar.com
                        </a>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
