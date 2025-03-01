'use client'
import React from 'react';
import { motion } from 'framer-motion';

const BuyOption = () => {
    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {[
                    {
                        img: "https://medibazar-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F01.42803813.jpg&w=640&q=75",
                        title: "Digital Meter",
                        subtitle: "Thermometer",
                    },
                    {
                        img: "https://medibazar-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F02.7d1c8f53.jpg&w=640&q=75",
                        title: "Temperature Gun",
                        subtitle: "Temperature",
                    },
                    {
                        img: "https://medibazar-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F03.d8829d99.jpg&w=640&q=75",
                        title: "Pulse",
                        subtitle: "Oximeter",
                    },
                ].map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="relative w-[400px] sm:w-[600px] mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ y: -10, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                    >
                        <div className="relative">
                            <img src={item.img} alt={item.title} className="w-full h-auto object-cover rounded-lg" />
                            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black">
                                <h4 className="text-lg text-[#838383] sm:text-xl font-semibold">{item.title}</h4>
                                <h2 className="text-2xl sm:text-3xl font-bold">{item.subtitle}</h2>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {[
                    {
                        img: "https://medibazar-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F04.a2cfd1cc.jpg&w=1080&q=75",
                        title: "Lab Surgery",
                        subtitle: "N95 Face Mask",
                    },
                    {
                        img: "https://medibazar-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F05.edeceab3.jpg&w=1080&q=75",
                        title: "Surgery Lab",
                        subtitle: "Hand Gloves",
                    },
                ].map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="relative w-full mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ y: -10, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                    >
                        <div className="relative">
                            <img src={item.img} alt={item.title} className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg" />
                            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black">
                                <h4 className="text-xl sm:text-2xl text-[#838383] font-semibold">{item.title}</h4>
                                <h2 className="text-3xl sm:text-4xl font-bold">{item.subtitle}</h2>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BuyOption;
