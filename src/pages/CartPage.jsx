// src/pages/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const context = useContext(CartContext);

  if (!context) {
    return <div className="p-6 text-red-600">Cart context is not available.</div>;
  }

  const { cart, removeItem, increaseQty, decreaseQty, clearCart } = context;

  const getPriceNumber = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ""));
  };

  const total = cart.reduce(
    (sum, item) => sum + getPriceNumber(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="from-blue-100 to-indigo-200 bg-gradient-to-br min-h-screen font-sans text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 bg-white px-4 py-3 rounded-lg shadow hover:bg-gray-50 transition duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="mb-2 sm:mb-0 sm:mr-6">
                      <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                      <p className="text-green-600 font-medium text-sm">{item.price}</p>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 bg-gray-100 text-lg font-bold rounded-full hover:bg-gray-200 transition"
                      >
                        −
                      </button>
                      <span className="font-medium text-base">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 bg-gray-100 text-lg font-bold rounded-full hover:bg-gray-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold mt-3 sm:mt-0 transition transform hover:scale-110"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-right bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-medium text-gray-700 mb-1">
                Total Items: <span className="text-indigo-600">{totalItems}</span>
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                Total Bill: <span className="text-indigo-700">₹{total}</span>
              </p>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-semibold shadow-md"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
