'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    createdAt: string;
}

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://medibazser.vercel.app/api/usersgetall');
                setUsers(response.data.data);
            } catch (error) {
                toast.error('Failed to fetch users!');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Format the date to a readable format
    const formatDate = (date: string) => new Date(date).toLocaleDateString();

    return (
        <div className="w-full mx-auto p-6">
            <Toaster />
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Manage Users</h2>
            {loading ? <p className="text-center text-gray-500">Loading users...</p> : (
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-600">Users</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <div key={user._id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-blue-500">
                                <div className="flex flex-col items-center mb-4">
                                    <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                                    <p className="text-lg font-medium text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                    <p className="text-sm text-gray-600">Role: {user.role}</p>
                                    <p className="text-sm text-gray-600">Created At: {formatDate(user.createdAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
