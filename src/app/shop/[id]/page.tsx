'use client'
import React, { useState, useEffect } from 'react';

interface Medicine {
    id: string;
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
}

const MedicineDetails = ({ params }: { params: { id: string } }) => {
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const { id } = params;
    useEffect(() => {
        if (!id) return;

        const fetchMedicineDetails = async () => {
            try {
                const response = await fetch(`/api/medicines/${id}`);
                const data = await response.json();
                setMedicine(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching medicine details:', error);
                setLoading(false);
            }
        };

        fetchMedicineDetails();
    }, [id]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value <= 500) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (medicine) {
            console.log('Added to cart:', { medicine, quantity });
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto my-8 px-4">
                {/* Skeleton loader for image */}
                <div className="skeleton-loader w-full h-80 bg-gray-200 animate-pulse mb-6"></div>
                {/* Skeleton loader for text */}
                <div className="skeleton-loader h-6 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
                <div className="skeleton-loader h-6 bg-gray-300 animate-pulse w-3/4 mb-4"></div>
                <div className="skeleton-loader h-6 bg-gray-300 animate-pulse w-2/3 mb-4"></div>
            </div>
        );
    }

    if (!medicine) {
        return <div className="text-center">Medicine not found</div>;
    }

    return (
        <div className="container mx-auto my-8 px-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <img className="w-full h-80 object-cover rounded-md" src={medicine.imageUrl} alt={medicine.name} />
                </div>
                <div className="md:w-1/2 pl-6">
                    <h2 className="text-3xl font-bold text-gray-800">{medicine.name}</h2>
                    <p className="text-lg font-semibold text-gray-600 mt-2">Category: {medicine.category}</p>
                    <p className="text-lg font-semibold text-gray-600 mt-2">Price: ${medicine.price.toFixed(2)}</p>
                    <p className="mt-4 text-gray-700"><strong>Age Range:</strong> {medicine.ageRange}</p>
                    <p className="mt-4 text-gray-700"><strong>Preparation:</strong> {medicine.preparation}</p>
                    <p className="mt-4 text-gray-700"><strong>Tags:</strong> {medicine.tags.join(', ')}</p>
                    <p className="mt-4 text-gray-700"><strong>Warnings:</strong></p>
                    <ul className="mt-2 list-disc list-inside">
                        {medicine.warnings.map((warning, index) => (
                            <li key={index} className="text-gray-600">{warning}</li>
                        ))}
                    </ul>
                    <p className="mt-4 text-gray-700"><strong>Side Effects:</strong></p>
                    <ul className="mt-2 list-disc list-inside">
                        {medicine.sideEffects.map((sideEffect, index) => (
                            <li key={index} className="text-gray-600">{sideEffect}</li>
                        ))}
                    </ul>
                    <div className="mt-6 flex items-center">
                        <label htmlFor="quantity" className="text-gray-700 mr-2">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max="500" // Restrict maximum quantity to 500
                            className="w-16 p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md w-full transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;