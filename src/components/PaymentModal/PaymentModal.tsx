'use client';
import React, { useEffect, useState } from 'react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';

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

    const handlePayment = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        try {
            const response = await fetch('https://medibazser.vercel.app/api/create-payment-intent', {
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

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement)! },
            });

            if (result.error) {
                Swal.fire('Payment Failed', result.error.message, 'error');
                return;
            }
            Swal.fire({
                title: 'Success',
                text: 'Payment successful!',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });


            const saveResponse = await fetch('https://medibazser.vercel.app/api/save-payment', {
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
                const response = await fetch(`https://medibazser.vercel.app/api/medicines/${item.productId}`);

                if (!response.ok) {
                    console.error(`Failed to fetch product data for product ${item.productId}`);
                    continue;
                }

                const productData = await response.json();
                if (productData.success && productData.data) {
                    const currentQuantity = productData.data.quantity;
                    const updatedQuantity = currentQuantity - item.quantity;

                    const updateResponse = await fetch(`https://medibazser.vercel.app/api/medicines/${item.productId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ quantity: updatedQuantity }),
                    });

                    if (!updateResponse.ok) {
                        console.error(`Failed to update stock for product ${item.productId}`);
                    }
                }

                const deleteResponse = await fetch('https://medibazser.vercel.app/api/mycart', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail, productId: item.productId }),
                });

                if (!deleteResponse.ok) {
                    console.error(`Failed to delete cart item ${item.productId}`);
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
