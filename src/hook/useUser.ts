// hooks/useUser.ts
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
    email: string;
    avatar: string;
 }

const useUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                if (decodedToken?.email) {
                    setUser({ email: decodedToken.email, avatar: decodedToken.avatar || '/default-avatar.png' });
                }
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, []);

    return user;
};

export default useUser;
