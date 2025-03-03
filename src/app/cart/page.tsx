'use client'
import useUser from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEye, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();
    const user = useUser();
    const LogedUserEmail = user?.email;

    useEffect(() => {
        if (!LogedUserEmail) {
            setIsLoggedIn(false);
            return;
        }

        setIsLoggedIn(true);

        const fetchCartItems = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/mycart/email/${LogedUserEmail}`);
                if (!response.ok) throw new Error('Failed to fetch cart items');
                const data = await response.json();
                setCartItems(data.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [LogedUserEmail]);

    const handleRemoveFromCart = async (productId: string) => {
        if (!LogedUserEmail) {
            alert('User not logged in!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/mycart', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: LogedUserEmail, productId })
            });

            const data = await response.json();
            if (data.success) {
                alert('Product removed from cart!');
                setCartItems(cartItems.filter(item => item.productId !== productId)); // UI থেকে রিমুভ করা
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Failed to remove product');
        }
    };

    const handleViewProduct = (productId: string) => {
        router.push(`/shop/${productId}`);
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    if (loading) {
        return <div className="text-center text-xl font-semibold">Loading...</div>;
    }

    if (!isLoggedIn) {
        return (
            <div className="container mx-auto my-8 px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
                <div className="mt-6 text-xl font-semibold text-gray-500">
                    You are not logged in. Please log in to view your cart.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-8 px-4">
            <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center text-xl font-semibold text-gray-500">Your cart is empty</div>
            ) : (
                <>
                    <div className="mt-6 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center">
                                    <img src={item.productimage} alt={item.productName} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">{item.productName}</h3>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        <p className="text-gray-800 font-semibold">
                                            Price: ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.productId)}
                                        className="flex justify-center items-center p-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
                                        aria-label="Remove item"
                                        title="Remove item"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => handleViewProduct(item.productId)}
                                        className="flex justify-center items-center p-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                                        aria-label="View product"
                                        title="View product"
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleCheckout}
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md text-lg"
                        >
                            <FaShoppingCart />
                            Proceed to Checkout




                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
