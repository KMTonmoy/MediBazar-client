import { useState, useEffect } from 'react';
import useUser from './useUser';
import axios from 'axios';

const useRole = () => {
    const [userData, setUserData] = useState<any[]>([]); // অ্যারে হিসেবে রাখতে হবে, কারণ একাধিক ইউজার থাকতে পারে
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const user = useUser();

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://medibazar-server.vercel.app/api/usersgetall`)
                .then((response) => {
                    const filteredUsers = response.data.data.filter((u: { email: string }) => u.email === user.email);

                    if (filteredUsers.length > 0) {
                        setUserData(filteredUsers); // শুধুমাত্র একই ইমেইলের সব ইউজার দেখাবে
                    } else {
                        setError('No users found with this email');
                        setUserData([]); // যদি না মিলে, তাহলে খালি অ্যারে সেট করবো
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching user data:', err);
                    setError('Failed to fetch user data');
                    setLoading(false);
                });
        }
    }, [user?.email]);

    return { userData, loading, error };
};

export default useRole;
