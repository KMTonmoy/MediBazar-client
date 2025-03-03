'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Banner from '@/components/Banner';

interface Medicine {
    _id: string;
    name: string;
    imageUrl: string;
    brand: string;
    price: number;
    category: string;
    ageRange: string;
    tags: string[];
    warnings: string[];
}

const Shop: React.FC = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

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

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="my-8 px-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Loading Medicines...</h2>
            </div>
        );
    }

    if (filteredMedicines.length === 0) {
        return (
            <div className="text-center text-xl font-semibold my-10 text-gray-600">
                No results found for "<span className="text-red-500">{searchQuery}</span>"
            </div>
        );
    }

    return (
        <div>
            <Banner />
            <div className="featured-medicines my-8 px-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop Medicines'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMedicines.map((data) => (
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
            </div>
        </div>
    );
};

export default Shop;
