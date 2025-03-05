'use client'
import useRole from '@/hook/useRole';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const user = useRole();
    const userInfo = user?.userData?.[0];
console.log(userInfo)

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
    });


    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/users/${userInfo._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully',
                    text: result.message,
                });
                setIsEditing(false);
            } else {
                throw new Error(result.message || 'Error updating profile');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error',
            });
        }
    };


    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'New password and confirm password don\'t match.',
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/users/${userInfo._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password updated successfully',
                    text: result.message,
                });
                setIsChangingPassword(false);
            } else {
                throw new Error(result.message || 'Error updating password');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">Profile Page</h1>

            {userInfo ? (
                <div className="relative">
                    {/* Edit Icon */}
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-blue-500"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <FiEdit2 size={20} />
                    </button>

                    {isEditing ? (

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </form>
                    ) : (

                        <div className="text-gray-800">
                            <p><strong>ID:</strong> {userInfo._id}</p>
                            <p><strong>Name:</strong> {userInfo.name}</p>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                        </div>
                    )}

                    {/* Change Password Button */}
                    <button
                        onClick={() => setIsChangingPassword(!isChangingPassword)}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                    >
                        Change Password
                    </button>

                    {/* Password Change Form */}
                    {isChangingPassword && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-3 mt-4">
                            <div>
                                <label className="block text-gray-700">Old Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                            >
                                Save New Password
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading user data...</p>
            )}
        </div>
    );
};

export default ProfilePage;
