"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useRole from "@/hook/useRole";

const DashboardHome: React.FC = () => {
    const [userdata, setTotalUserData] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { userData } = useRole();
    const userInfo = userData?.[0];
    const role = userInfo?.role;

    const fetchtotalUser = async () => {
        try {
            const response = await fetch("https://medibazar-server.vercel.app/api/usersgetall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            setTotalUserData(result.data);
        } catch (err: any) {
            setTotalUserData({}); 
        } finally {
            setLoading(false);
        }
    };

    const fetchtotalorders = async () => {
        try {
            const response = await fetch("https://medibazar-server.vercel.app/api/orders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            setOrders(result.data);
        } catch (err: any) {
            setOrders([]); // Set empty array in case of error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchtotalUser();
        fetchtotalorders();
    }, []);

    if (loading) return <div>Loading...</div>;

    const totalAdmins = userdata?.filter((user: any) => user.role === "admin").length || 0;
    const totalUsers = userdata?.length || 0;
    const totalPendingOrders = userdata?.pendingOrders || 0;
    const totalRevenue = userdata?.revenue || 0;
    const totalCartItems = userdata?.cartItems || 0;
    const totalOrders = orders?.length || 0;

    return (
        <div className="p-8 bg-gray-100 min-h-screen w-full">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="text-gray-600 mb-8">Manage your data and settings here.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {role === "admin" ? (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
                            <p className="text-3xl font-bold">{totalPendingOrders}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Total Users</h2>
                            <p className="text-3xl font-bold">{totalUsers}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Total Admins</h2>
                            <p className="text-3xl font-bold">{totalAdmins}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Total Cart Items</h2>
                            <p className="text-3xl font-bold">{totalCartItems}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
                            <p className="text-3xl font-bold">{totalOrders}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
                            <p className="text-3xl font-bold">{totalRevenue}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
