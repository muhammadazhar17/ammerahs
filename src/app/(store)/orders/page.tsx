import React from 'react';

const OrdersPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-8 font-sans text-gray-800">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Orders</h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mb-6">
                Welcome to the orders page. Here you can view all your orders.
            </p>
            {/* Add more content or components as needed */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mt-8">
                <h2 className="text-2xl font-semibold text-gray-800">You Donot have any orders.</h2>
                <p className="text-sm text-gray-600 mt-2">Yet!</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500 transition duration-300">
                    View Details
                </button>
            </div>
        </div>
    );
};



export default OrdersPage;
