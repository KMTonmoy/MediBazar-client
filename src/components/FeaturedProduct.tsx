'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Medicine {
    _id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    ageRange: string;
    tags: string[];
    warnings: string[];
    requiresPrescription: boolean;
}

const FeaturedMedi: React.FC = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/medicines');
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
            <div className="my-8 px-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Featured Medicines</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="bg-gray-200 p-5 rounded-lg animate-pulse">
                            <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                            <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded-md w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
                        </div>
                    ))}
                </div>
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


    const featuredMedi = medicines.slice(-9);

    return (
        <div className="featured-medicines my-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Featured Medicines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredMedi.map((data) => (
                    <div key={data._id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img className="w-full h-48 object-cover rounded-md mb-4" src={data.imageUrl} alt={data.name} />
                        <h3 className="text-xl font-bold mb-2 text-gray-700">{data.name}</h3>
                        <p className="text-gray-600"><strong>Category:</strong> {data.category}</p>
                        <p className="text-gray-600"><strong>Age:</strong> {data.ageRange}</p>
                        <p className="text-lg font-semibold text-green-600 mt-2"><strong>Price:</strong> ${data.price.toFixed(2)}</p>

                        <Link href={`/shop/${data._id}`} className="block mt-4">
                            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors w-full">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center my-10">
                <Link href="/shop">
                    <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors">
                        View All Medicines
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedMedi;
