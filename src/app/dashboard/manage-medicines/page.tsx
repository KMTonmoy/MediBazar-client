'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import CustomModal from '../../../components/CustomModal/CustomModal';

interface Medicine {
    _id?: string;
    name: string;
    imageUrl: string;
    brand: string;
    price: number;
    category: string;
    quantity: number;
    inStock: boolean;
    ageRange: string;
    tags: string[];
    warnings: string[];
    sideEffects: string[];
    preparation: string;
    prescriptionImage: string;
    IsDrPrescriptionRequired: boolean;
}

const ManageMedicines = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [newMedicine, setNewMedicine] = useState<Medicine>({
        name: '',
        imageUrl: '',
        brand: '',
        price: 0,
        category: '',
        quantity: 0,
        inStock: true,
        ageRange: '',
        tags: [],
        warnings: [],
        sideEffects: [],
        preparation: '',
        prescriptionImage: '',
        IsDrPrescriptionRequired: false,
    });
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await axios.get('https://medibazar-server.vercel.app/api/medicines');
            setMedicines(response.data.data);
        };
        fetchMedicines();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMedicine((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitMedicine = async () => {
        const newMedicineData = { ...newMedicine };

        const response = await axios.post('https://medibazar-server.vercel.app/api/medicines', newMedicineData);
        if (response.data.success) {
            setMedicines([...medicines, response.data.medicine]);
            setModalOpen(false);
            toast.success('Medicine added successfully!');
        }
    };

    const handleUpdateMedicine = async () => {
        if (!selectedMedicine) return;

        const updatedMedicineData = { ...selectedMedicine };

        const response = await axios.put(`https://medibazar-server.vercel.app/api/medicines/${selectedMedicine?._id}`, updatedMedicineData);
        if (response.data.success) {
            setMedicines(medicines.map((med) => (med._id === selectedMedicine?._id ? updatedMedicineData : med)));
            setUpdateModalOpen(false);
            toast.success('Medicine updated successfully!');
        }
    };

    const handleDeleteMedicine = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this medicine!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`https://medibazar-server.vercel.app/api/medicines/${id}`);
                if (response.data.success) {
                    setMedicines(medicines.filter((med) => med._id !== id));
                    Swal.fire('Deleted!', 'Your medicine has been deleted.', 'success');
                }
            }
        });
    };

    const handleAddMedicineClick = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleEditMedicineClick = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => setUpdateModalOpen(false);

    const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSelectedMedicine((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handlePrescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewMedicine({ ...newMedicine, IsDrPrescriptionRequired: value === 'yes' });
    };

    const handleUpdatePrescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (selectedMedicine) {
            setSelectedMedicine({
                ...selectedMedicine,
                IsDrPrescriptionRequired: value === 'yes',
            });
        }
    };

    return (
        <div className="max-w-full mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Manage Medicines</h2>
            <button
                onClick={handleAddMedicineClick}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mb-6"
            >
                Add New Medicine
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicines.map((medicine) => (
                    <div key={medicine?._id} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <img src={medicine?.imageUrl} alt={medicine?.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h4 className="text-lg font-medium text-gray-800">{medicine?.name}</h4>
                        <p className="text-sm text-gray-500">{medicine?.brand}</p>
                        <p className="text-sm text-gray-500">{medicine?.category}</p>
                        <p className="text-sm text-gray-500">{medicine?.price} USD</p>
                        <p className="text-sm text-gray-500">In stock: {medicine?.quantity}</p>

                        <div className="flex space-x-2 mt-4">
                            <button
                                onClick={() => handleEditMedicineClick(medicine)}
                                className="text-yellow-600 hover:text-yellow-800 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteMedicine(medicine?._id!)}
                                className="text-red-600 hover:text-red-800 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <CustomModal open={modalOpen} onClose={handleCloseModal} title="Add New Medicine">
                <div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Medicine Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newMedicine?.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={newMedicine?.imageUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={newMedicine?.brand}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newMedicine?.price}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={newMedicine?.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={newMedicine?.quantity}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">Age Range</label>
                        <input
                            type="text"
                            id="ageRange"
                            name="ageRange"
                            value={newMedicine?.ageRange}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={newMedicine?.tags.join(', ')}
                            onChange={(e) => setNewMedicine({ ...newMedicine, tags: e.target.value.split(', ') })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="IsDrPrescriptionRequired" className="block text-sm font-medium text-gray-700">Doctor's Prescription Required</label>
                        <select
                            id="IsDrPrescriptionRequired"
                            name="IsDrPrescriptionRequired"
                            value={newMedicine.IsDrPrescriptionRequired ? 'yes' : 'no'}
                            onChange={handlePrescriptionChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleSubmitMedicine}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Medicine
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </CustomModal>

            <CustomModal open={updateModalOpen} onClose={handleCloseUpdateModal} title="Update Medicine">
                <div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Medicine Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={selectedMedicine?.name || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={selectedMedicine?.imageUrl || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={selectedMedicine?.brand || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={selectedMedicine?.price || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={selectedMedicine?.category || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={selectedMedicine?.quantity || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">Age Range</label>
                        <input
                            type="text"
                            id="ageRange"
                            name="ageRange"
                            value={selectedMedicine?.ageRange || ''}
                            onChange={handleUpdateInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={selectedMedicine?.tags.join(', ') || ''}
                            onChange={(e) => setSelectedMedicine((prev) => (prev ? { ...prev, tags: e.target.value.split(', ') } : prev))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="IsDrPrescriptionRequired" className="block text-sm font-medium text-gray-700">Doctor's Prescription Required</label>
                        <select
                            id="IsDrPrescriptionRequired"
                            name="IsDrPrescriptionRequired"
                            value={selectedMedicine?.IsDrPrescriptionRequired ? 'yes' : 'no'}
                            onChange={handleUpdatePrescriptionChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleUpdateMedicine}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update Medicine
                        </button>
                        <button
                            onClick={handleCloseUpdateModal}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default ManageMedicines;
