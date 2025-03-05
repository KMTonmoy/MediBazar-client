'use client';
import React, { useEffect, useState } from 'react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import useUser from '@/hook/useUser';

const stripePromise = loadStripe('pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33');

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: any[];
    totalPrice: number;
    userEmail: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, cartItems, totalPrice, userEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useUser();
    const LogedUserEmail = user?.email;
    const [mycartItems, setCartItems] = useState<any[]>([]);
    console.log(mycartItems)

    useEffect(() => {

        const fetchCartItems = async () => {
            try {
                const response = await fetch(`https://medibazar-server.vercel.app/api/mycart/email/${LogedUserEmail}`);
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




    const handlePayment = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        try {
            // Step 1: Create Payment Intent
            const response = await fetch('http://localhost:8000/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    amount: totalPrice * 100,
                    cartItems,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const { clientSecret } = await response.json();

            // Step 2: Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement)! },
            });

            if (result.error) {
                Swal.fire('Payment Failed', result.error.message, 'error');
                return;
            }

            Swal.fire('Success', 'Payment successful!', 'success');

            // Step 3: Save Payment
            const saveResponse = await fetch('http://localhost:8000/api/save-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    amount: totalPrice,
                    cartItems,
                    status: 'success',
                    ordertrack: 'pending',
                }),
            });

            if (!saveResponse.ok) {
                throw new Error('Failed to save payment');
            }

            for (const item of cartItems) {
                console.log(item);

                // Fetch the current product data
                const response = await fetch(`http://localhost:8000/api/medicines/${item.productId}`);

                if (!response.ok) {
                    console.error(`Failed to fetch product data for product ${item.productId}`);
                    continue; // Skip this item if the product fetch fails
                }

                const productData = await response.json();
                if (productData.success && productData.data) {
                    const currentQuantity = productData.data.quantity; // Get the current quantity

                    // Calculate the updated quantity
                    const updatedQuantity = currentQuantity - item.quantity;
                    console.log(`Updated quantity for product ${item.productId}: ${updatedQuantity}`);


                    const updateResponse = await fetch(`http://localhost:8000/api/medicines/${item.productId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ quantity: updatedQuantity }),
                    });

                    if (!updateResponse.ok) {
                        console.error(`Failed to update stock for product ${item.productId}`);
                    } else {
                        console.log(`Stock updated successfully for product ${item.productId}`);
                    }
                } else {
                    console.error(`Product data not found for product ${item.productId}`);
                }
            }


            onClose();
        } catch (error) {
            console.error('Payment failed:', error);
            Swal.fire('Error', 'Payment failed. Try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold">Complete Your Payment</h2>
                <p>Total: ${totalPrice.toFixed(2)}</p>
                <form onSubmit={handlePayment} className="mt-4">
                    <CardElement className="border p-2 rounded-md" />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
                <button onClick={onClose} className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md">
                    Cancel
                </button>
            </div>
        </div>
    );
};

const PaymentModalWrapper: React.FC<PaymentModalProps> = (props) => (
    <Elements stripe={stripePromise}>
        <PaymentModal {...props} />
    </Elements>
);

export default PaymentModalWrapper;
