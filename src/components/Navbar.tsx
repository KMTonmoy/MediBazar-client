'use client'
import { useState, useEffect } from 'react';
import { LuShoppingBag } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Link from 'next/link';
import logo from '../../public/logo.webp';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useRole from '@/hook/useRole';

const Navbar = () => {
    const UserData = useRole();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    return (
        <div className='bg-white py-5 shadow-2xs sticky top-0 w-full z-50'>
            <div className='max-w-7xl mx-auto px-4 md:py-[15px]'>
                <div className='flex justify-between items-center text-black'>
                    <h1 className='font-[800] text-[26px]'>
                        <Image width={200} src={logo} alt="logo" />
                    </h1>
                    <div className='hidden md:flex gap-5'>
                        <Link href="/" className={`text-[17px] font-[600] transition-all duration-300 ${pathname === '/' ? 'text-[#4F97FC]' : 'text-black'}`}>Home</Link>
                        {['Shop', 'Blogs', 'Contact Us', 'About'].map((item, index) => {
                            const linkPath = `/${item.replace(/\s+/g, '').toLowerCase()}`;
                            return (
                                <Link key={index} href={linkPath} className={`text-[17px] font-[600] transition-all duration-300 ${pathname === linkPath ? 'text-[#4F97FC]' : 'text-black'}`}>
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                    <div className='flex gap-5 items-center'>
                        <Link className='text-[27px] font-[600] hover:text-[#4F97FC] transition-colors duration-300' href='/cart'>
                            <LuShoppingBag />
                        </Link>
                        {user ? (
                            <div className='relative'>
                                <Avatar onClick={toggleDropdown} className='cursor-pointer'>
                                    <AvatarImage src={UserData?.userData?.length > 0 ? UserData.userData[0].image : '/default-avatar.png'} alt="User Avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg'>
                                        <Link href="/profile" className='block px-4 py-2 text-black hover:bg-gray-200'>Profile</Link>
                                        <Link href="/dashboard" className='block px-4 py-2 text-black hover:bg-gray-200'>Dashboard</Link>
                                        <button onClick={handleLogout} className='block w-full px-4 py-2 text-black hover:bg-gray-200 text-left'>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link className='text-[27px] font-[600] hover:text-[#4F97FC] transition-colors duration-300' href='/login'>
                                <FaRegUser />
                            </Link>
                        )}
                        <button className='md:hidden text-[27px] hover:text-[#4F97FC] transition-colors duration-300' onClick={toggleMenu}>
                            <HiOutlineMenuAlt3 />
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className='fixed top-0 right-0 h-full w-[70%] bg-white text-black shadow-lg z-50'>
                    <div className='flex justify-between items-center px-4 py-4 border-b border-gray-700'>
                        <Image width={200} src={logo} alt="logo" />
                        <button onClick={toggleMenu} className='text-[27px] hover:text-[#4F97FC] transition-colors duration-300'>
                            <IoClose />
                        </button>
                    </div>
                    <div className='flex flex-col gap-6 px-4 py-6'>
                        <Link href="/" className={`text-[17px] font-[600] transition-all duration-300 ${pathname === '/' ? 'text-[#4F97FC]' : 'text-black'}`} onClick={toggleMenu}>Home</Link>
                        {['Shop', 'Blogs', 'Contact Us'].map((item, index) => {
                            const linkPath = `/${item.replace(/\s+/g, '').toLowerCase()}`;
                            return (
                                <Link key={index} href={linkPath} className={`text-[17px] font-[600] transition-all duration-300 ${pathname === linkPath ? 'text-[#4F97FC]' : 'text-black'}`} onClick={toggleMenu}>
                                    {item}
                                </Link>
                            );
                        })}
                        {user ? (
                            <>
                                <Link href="/profile" className='block px-4 py-2 text-black hover:bg-gray-200' onClick={toggleMenu}>Profile</Link>
                                <Link href="/dashboard" className='block px-4 py-2 text-black hover:bg-gray-200' onClick={toggleMenu}>Dashboard</Link>
                                <button onClick={handleLogout} className='block w-full px-4 py-2 text-black hover:bg-gray-200 text-left'>Logout</button>
                            </>
                        ) : (
                            <Link href="/login" className='block px-4 py-2 text-black hover:bg-gray-200' onClick={toggleMenu}>Login</Link>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
