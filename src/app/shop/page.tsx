'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Medicine {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    ageRange: string;
}

const ShopPage = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/medicines/');
                const data = await response.json();
                setMedicines(data.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-xl font-semibold my-10">
                <div className="skeleton-loader w-80 h-12 bg-gray-300 mb-6"></div>
                <div className="skeleton-loader w-72 h-12 bg-gray-300 mb-6"></div>
                <div className="skeleton-loader w-64 h-12 bg-gray-300 mb-6"></div>
            </div>
        );
    }

    if (medicines.length === 0) {
        return (
            <div className="text-center text-xl font-semibold my-10 text-gray-600">
                No medicines available at the moment.
            </div>
        );
    }

    return (
        <div className="my-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">All Medicines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {medicines.map((data) => (
                    <div key={data.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img className="w-full h-48 object-cover rounded-md mb-4" src={data.imageUrl} alt={data.name} />
                        <h3 className="text-xl font-bold mb-2 text-gray-700">{data.name}</h3>
                        <p className="text-gray-600"><strong>Category:</strong> {data.category}</p>
                        <p className="text-gray-600"><strong>Age:</strong> {data.ageRange}</p>
                        <p className="text-lg font-semibold text-green-600 mt-2"><strong>Price:</strong> ${data.price.toFixed(2)}</p>
                        <Link href={`/shop/${data.id}`} passHref>
                            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors w-full mt-4">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
