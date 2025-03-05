'use client'
import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'next/navigation';

interface Medicine {
    _id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    ageRange: string;
    tags: string[];
    warnings: string[];
    sideEffects: string[];
    preparation: string;
    requiresPrescription: boolean;
    quantity: number;
    IsDrPrescriptionRequired: boolean;
}

const MedicineDetails = () => {
    const params = useParams();
    const [user, setUser] = useState<any>(null);
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const _id = params?.id as string | undefined;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                setUser(jwtDecode(token));
            } catch (error) {
                console.error('Invalid token');
            }
        }
    }, []);

    useEffect(() => {
        const fetchMedicineDetails = async () => {
            try {
                if (!_id) return;
                const response = await fetch(`https://medibazser.vercel.app/api/medicines/${_id}`);
                if (!response.ok) throw new Error('Failed to fetch medicine details');
                const data = await response.json();
                setMedicine(data.data || data);
            } catch (error) {
                console.error('Error fetching medicine details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicineDetails();
    }, [_id]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (medicine && !isNaN(value) && value > 0 && value <= medicine.quantity) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async () => {
        if (user && medicine) {
            try {
                const response = await fetch('https://medibazser.vercel.app/api/mycart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        productId: medicine._id,
                        productName: medicine.name,
                        price: medicine.price,
                        productimage: medicine.imageUrl,
                        productType: medicine.category,
                        productModel: medicine.name,
                        quantity,
                    }),
                });
                if (!response.ok) throw new Error('Failed to add to cart');
                toast.success('🍀 Medicine added to cart!');
            } catch (error) {
                toast.error('🚨 Something went wrong!');
            }
        } else {
            toast.error('🚨 Please log in to add medicine to cart!');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto my-8 px-4">
                <div className="w-full h-80 bg-gray-200 animate-pulse mb-6 rounded-md"></div>
                <span className="block h-6 bg-gray-300 animate-pulse w-1/2 mb-4"></span>
                <span className="block h-6 bg-gray-300 animate-pulse w-3/4 mb-4"></span>
                <span className="block h-6 bg-gray-300 animate-pulse w-2/3 mb-4"></span>
            </div>
        );
    }

    if (!medicine) {
        return <div className="text-center text-red-500 text-xl font-semibold">⚠️ Medicine not found</div>;
    }

    return (
        <div className="container mx-auto my-8 px-4">
            <Toaster />
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <img className="w-full h-80 object-cover rounded-md" src={medicine.imageUrl} alt={medicine.name} />
                </div>
                <div className="md:w-1/2 pl-6">
                    <h2 className="text-3xl font-bold text-gray-800">{medicine.name}</h2>
                    <p className="text-lg font-semibold text-gray-600 mt-2">Category: {medicine.category}</p>
                    <p className="text-lg font-semibold text-gray-600 mt-2">In Stock: {medicine.quantity}</p>
                    <p className="text-lg font-semibold text-gray-600 mt-2">Price: ${medicine.price.toFixed(2)}</p>
                    <p className="mt-4 text-gray-700"><strong>Age Range:</strong> {medicine.ageRange}</p>
                    <p className="mt-4 text-gray-700"><strong>Preparation:</strong> {medicine.preparation}</p>
                    <p className="mt-4 text-gray-700">
                        <strong>Doctor Prescription Required:</strong> {medicine.IsDrPrescriptionRequired ? 'Yes' : 'No'}
                    </p>
                    <p className="mt-4 text-gray-700"><strong>Tags:</strong> {medicine.tags.join(', ')}</p>
                    {medicine.warnings.length > 0 && (
                        <>
                            <p className="mt-4 text-gray-700"><strong>Warnings:</strong></p>
                            <ul className="mt-2 list-disc list-inside">
                                {medicine.warnings.map((warning, index) => (
                                    <li key={index} className="text-gray-600">{warning}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {medicine.sideEffects.length > 0 && (
                        <>
                            <p className="mt-4 text-gray-700"><strong>Side Effects:</strong></p>
                            <ul className="mt-2 list-disc list-inside">
                                {medicine.sideEffects.map((sideEffect, index) => (
                                    <li key={index} className="text-gray-600">{sideEffect}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    <div className="mt-6 flex items-center">
                        <label htmlFor="quantity" className="text-gray-700 mr-2">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max={medicine?.quantity || 1}
                            className="w-16 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md w-full transition-colors flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;
