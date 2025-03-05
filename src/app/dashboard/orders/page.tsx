'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, useEffect } from 'react';

interface CartItem {
  _id: string;
  email: string;
  productId: string;
  quantity: number;
  productName: string;
  price: number;
  productimage: string;
  productType: string;
  productModel: string;
}

interface Order {
  ordertrack: string;
  _id: string;
  email: string;
  amount: number;
  cartItems: CartItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('pending'); // Set the default active tab to "pending"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-all-orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderTrack = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/update-order/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ordertrack: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order track');
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, ordertrack: updatedOrder.ordertrack } : order
        )
      );
    } catch (error) {
      console.error('Error updating order track:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading orders...</div>;
  }

  const groupedOrders = {
    pending: orders.filter((order) => order.ordertrack === 'pending'),
    canceled: orders.filter((order) => order.ordertrack === 'canceled'),
    shipped: orders.filter((order) => order.ordertrack === 'shipped'),
    delivered: orders.filter((order) => order.ordertrack === 'delivered'),
  };



  
  const renderOrderDetails = (order: Order) => (
    <div key={order._id} className="p-4 border-b flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">Order ID: {order._id}</div>
        <div className="text-lg font-semibold text-gray-600">Email: {order.email}</div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div>
          <h3 className="font-semibold text-gray-800">Products:</h3>
          <ul className="space-y-2">
            {order.cartItems.map((product) => (
              <li key={product._id} className="flex items-center text-gray-700">
                <img
                  src={product.productimage}
                  alt={product.productName}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p>{product.productName} ({product.productModel})</p>
                  <p>Quantity: {product.quantity} × ${product.price}</p>
                  <p className="text-gray-500">Product Type: {product.productType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Payment Status:</h3>
          <p className={`text-${order.status === 'success' ? 'green' : 'red'}-500`}>
            {order.status}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Total Amount:</h3>
          <p className="text-gray-800">${order.amount.toFixed(2)}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Order Tracking Status:</h3>
          <p
            className={`text-${order.ordertrack === 'pending' ? 'yellow' : order.ordertrack === 'shipped' ? 'blue' : 'green'}-500`}
          >
            {order.ordertrack}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex gap-4">
          <select
            value={order.ordertrack}
            onChange={(e) => updateOrderTrack(order._id, e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
            disabled={order.ordertrack === 'canceled' || order.ordertrack === 'delivered'}
          >
            <option value="pending" disabled={order.ordertrack === 'pending'}>Pending</option>
            <option value="shipped" disabled={order.ordertrack === 'shipped'}>Shipped</option>
            <option value="delivered" disabled={order.ordertrack === 'delivered'}>Delivered</option>
            <option value="canceled" disabled={order.ordertrack === 'canceled'}>Canceled</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold text-gray-800">Manage Orders</h2>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {groupedOrders.pending.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">No pending orders</div>
          ) : (
            <div className="mt-6 space-y-6">
              {groupedOrders.pending.map(renderOrderDetails)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shipped">
          {groupedOrders.shipped.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">No shipped orders</div>
          ) : (
            <div className="mt-6 space-y-6">
              {groupedOrders.shipped.map(renderOrderDetails)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="delivered">
          {groupedOrders.delivered.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">No delivered orders</div>
          ) : (
            <div className="mt-6 space-y-6">
              {groupedOrders.delivered.map(renderOrderDetails)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="canceled">
          {groupedOrders.canceled.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-500">No canceled orders</div>
          ) : (
            <div className="mt-6 space-y-6">
              {groupedOrders.canceled.map(renderOrderDetails)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement;
