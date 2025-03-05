'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';

// ✅ Lottie Animation dynamically import করা হলো (ssr: false)
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import contactAnimation from '../../../public/contactus.json';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, message } = formData;

        try {
            const response = await fetch('https://formspree.io/f/xzzdnnll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                toast.success('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error('Failed to send message. Please try again later.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
            <Toaster />
            <div className="flex max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                {/* Lottie Animation */}
                <div className="w-1/2 flex justify-center items-center">
                    <Lottie animationData={contactAnimation} loop={true} className="w-full max-w-sm" />
                </div>

                {/* Contact Form */}
                <div className="w-1/2 px-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Contact Us</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                className="w-full p-3 border border-gray-300 rounded-md"
                                rows={5}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
