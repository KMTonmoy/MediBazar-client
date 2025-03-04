"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaHome,
    FaPills,
    FaClipboardList,
    FaUsers,
    FaTags,
    FaCogs,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import useRole from "@/hook/useRole";

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const user = useRole();
    const userInfo = user?.userData?.[0];
    const role = userInfo?.role;

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff9d00",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                router.push("/login");
                Swal.fire("Logged out!", "You have been logged out.", "success");
                window.location.reload();
            }
        });
    };

    return (
        <div className="flex md:z-0 md:w-[280px] z-50 min-h-screen bg-gray-800 text-white">
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-4 text-2xl focus:outline-none"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div
                className={`fixed lg:static bg-gray-900 w-64 h-full transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 overflow-y-auto overflow-x-hidden`}
            >
                <div className="p-5 flex items-center space-x-4 bg-gray-800">
                    <img
                        src={userInfo?.image || "/default-avatar.png"}
                        alt="User Avatar"
                        className="h-12 w-12 rounded-full"
                    />
                    <div>
                        <h2 className="text-lg font-bold">{userInfo?.name || "User"}</h2>
                        <p className="text-sm text-gray-400">Role: {role}</p>
                    </div>
                </div>

                <nav className="mt-8">
                    <Link href="/dashboard" className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-transform hover:scale-105">
                        <FaHome className="text-xl" />
                        <span>Home</span>
                    </Link>

                    <Link href="/dashboard/orders" className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-transform hover:scale-105">
                        <FaClipboardList className="text-xl" />
                        <span>Orders</span>
                    </Link>

                    {role === "admin" && (
                        <>
                            <Link href="/dashboard/customers" className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-transform hover:scale-105">
                                <FaUsers className="text-xl" />
                                <span>Customers</span>
                            </Link>
                            <Link href="/dashboard/manage-medicines" className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-transform hover:scale-105">
                                <FaPills className="text-xl" />
                                <span>Manage Medicines</span>
                            </Link>


                        </>
                    )}
                </nav>

                <div className="p-5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 p-4 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                    >
                        <FaSignOutAlt className="text-xl" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
