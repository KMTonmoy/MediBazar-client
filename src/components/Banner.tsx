'use client'
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Banner = () => {
    const slides = [
        {
            img: "https://t4.ftcdn.net/jpg/01/33/33/41/360_F_133334155_X23HzbJKawbIgXVaub4bPM8CjpkS5uMS.jpg",
            title: "Your Health, Our Priority",
            subtitle: "Trusted Medicines Delivered to You",
        },
        {
            img: "https://cdn.prod.website-files.com/6613e68f1a19d0ab2c37e857/6684466f09d7a5a37b124ec2_64b6b701236708cf047e427a_portrait-of-a-handsome-pharmacist-working-in-a-pha-2022-03-25-19-59-50-utc.jpeg",
            title: "Fast & Reliable Pharmacy",
            subtitle: "Get Your Prescriptions Hassle-Free",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };



    return (
        <div className="relative w-full h-[60vh] sm:h-[700px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out ${currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                        }`}
                    style={{ backgroundImage: `url(${slide.img})` }}
                >
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#183b6d] text-center w-full px-4 sm:max-w-xl lg:max-w-4xl">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 whitespace-nowrap">{slide.title}</h4>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight sm:leading-snug">
                            {slide.subtitle}
                        </h1>

                        {/* Search Input */}
                        <div className="relative flex justify-center items-center mt-5">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for medicines..."
                                className="px-5 py-3 w-[90%] sm:w-[450px] bg-white border-none shadow-md rounded-full outline-none text-gray-800 pr-12"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-8 md:right-[25%] top-1/2 transform -translate-y-1/2 bg-[#4F97FC] text-white p-3 rounded-full shadow-lg hover:bg-[#3B7DD4] transition-all"
                            >
                                <FaSearch size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons - Moved to Bottom Right */}
            <div className="absolute bottom-5 right-5 flex gap-3">
                <button
                    onClick={prevSlide}
                    className="bg-black/50 hover:bg-black text-white p-3 rounded-full transition-all"
                >
                    <FaChevronLeft size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-black/50 hover:bg-black text-white p-3 rounded-full transition-all"
                >
                    <FaChevronRight size={20} />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-5 left-[50%] transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#4F97FC]' : 'bg-gray-300'} transition-all`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
