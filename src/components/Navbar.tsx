'use client'
import { useState } from 'react';
import { LuShoppingBag } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Link from 'next/link';
import logo from '../../public/logo.webp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
 
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => location.pathname === path ? 'text-[#4F97FC]' : '';

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff9d00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                router.push('/login');
                Swal.fire('Logged out!', 'You have been logged out.', 'success');
                window.location.reload();
            }
        });
    };

    return (
        <div className='bg-white py-5 shadow-2xs sticky top-0 w-full z-50'>
            <div className='max-w-7xl mx-auto px-4 md:py-[15px]'>
                <div className='flex justify-between items-center text-black'>
                    <h1 className='font-[800] text-[26px]'>
                        <Image width={200} src={logo} alt="logo" />
                    </h1>
                    <div className='hidden md:flex gap-5'>
                        <Link
                            href={`/`}
                            className={`text-[17px] font-[600] relative group transition-all duration-300 ${isActive('/')}`}
                        >
                            Home
                            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#4F97FC] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        {['Shop', 'Blogs', 'Contact Us', 'About'].map((item, index) => (
                            <Link
                                key={index}
                                href={`/${item.replace(/\s+/g, '').toLowerCase()}`}
                                className={`text-[17px] font-[600] relative group transition-all duration-300 ${isActive(`/${item.replace(/\s+/g, '').toLowerCase()}`)}`}
                            >
                                {item}
                                <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#4F97FC] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link
                            href={`/dashboard`}
                            className={`text-[17px] font-[600] relative group transition-all duration-300 ${isActive('/dashboard')}`}
                        >
                            Dashboard
                            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#4F97FC] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <Link className='text-[27px] font-[600] hover:text-[#4F97FC] transition-colors duration-300' href='/cart'>
                            <LuShoppingBag />
                        </Link>
                        <Link className='text-[27px] font-[600] hover:text-[#4F97FC] transition-colors duration-300' href='/login'>
                            <FaRegUser />
                        </Link>
                        <button
                            className='text-[17px] bg-[#4F97FC] text-white font-[600] hover:bg-[#4F97FC] py-1 px-4 rounded transition-colors duration-300'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button className='md:hidden text-[27px] hover:text-[#4F97FC] transition-colors duration-300' onClick={toggleMenu}>
                            <HiOutlineMenuAlt3 />
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className='fixed top-0 right-0 h-full w-[70%] bg-white text-black shadow-lg z-50'
                >
                    <div className='flex justify-between items-center px-4 py-4 border-b border-gray-700'>
                        <Image width={200} src={logo} alt="logo" />
                        <button onClick={toggleMenu} className='text-[27px] hover:text-[#4F97FC] transition-colors duration-300'>
                            <IoClose />
                        </button>
                    </div>
                    <div className='flex flex-col gap-6 px-4 py-6'>
                        <Link
                            href={`/`}
                            className={`text-[17px] font-[600] relative group transition-all duration-300 ${isActive('/')}`}
                            onClick={toggleMenu}
                        >
                            Home
                            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#4F97FC] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        {['Shop', 'Blogs', 'Contact Us'].map((item, index) => (
                            <Link
                                key={index}
                                href={`/${item.replace(/\s+/g, '').toLowerCase()}`}
                                className={`text-[17px] font-[600] relative group transition-all duration-300 ${isActive(`/${item.replace(/\s+/g, '').toLowerCase()}`)}`}
                                onClick={toggleMenu}
                            >
                                {item}
                                <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#4F97FC] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link
                            className='flex items-center text-[17px] font-[600] relative group transition-all duration-300'
                            href='/profile'
                            onClick={toggleMenu}
                        >
                            <FaRegUser className='mr-2' />
                            Login
                            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#4F97FC] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
