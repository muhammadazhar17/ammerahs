import React from "react";

const Features: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition">
            <div className="text-yellow-400 text-5xl mb-4">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Fast Shipping</h3>
            <p className="text-gray-600 mt-2">
              Get your orders delivered to your doorstep quickly and reliably.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition">
            <div className="text-yellow-400 text-5xl mb-4">
              <i className="fas fa-tags"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Best Prices</h3>
            <p className="text-gray-600 mt-2">
              Enjoy unbeatable prices and exclusive deals on all your favorite items.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition">
            <div className="text-yellow-400 text-5xl mb-4">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
            <p className="text-gray-600 mt-2">
              Our customer support team is here to assist you anytime, day or night.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;


// import React from "react";  ashar

// const Features: React.FC = () => {
//   return (
//     <div className="bg-white/50 backdrop-blur-lg text-gray-800 py-20">
//       <div className="container mx-auto px-6 md:px-12 lg:px-20">
//         <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-black">
//           Why Shop With Us?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {/* Feature 1 */}
//           <div className="flex flex-col items-center text-center space-y-4 hover:scale-105 transform transition duration-300 ease-in-out">
//             <div className="bg-white/40 p-6 rounded-full shadow-lg backdrop-blur-md hover:bg-white/50">
//               <i className="fas fa-shipping-fast text-4xl text-yellow-400"></i>
//             </div>
//             <h3 className="text-xl font-semibold text-black">Fast Shipping</h3>
//             <p className="text-gray-600">
//               Get your orders delivered to your doorstep quickly and reliably.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="flex flex-col items-center text-center space-y-4 hover:scale-105 transform transition duration-300 ease-in-out">
//             <div className="bg-white/40 p-6 rounded-full shadow-lg backdrop-blur-md hover:bg-white/50">
//               <i className="fas fa-tags text-4xl text-yellow-400"></i>
//             </div>
//             <h3 className="text-xl font-semibold text-black">Best Prices</h3>
//             <p className="text-gray-600">
//               Enjoy unbeatable prices and exclusive deals on all your favorite items.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="flex flex-col items-center text-center space-y-4 hover:scale-105 transform transition duration-300 ease-in-out">
//             <div className="bg-white/40 p-6 rounded-full shadow-lg backdrop-blur-md hover:bg-white/50">
//               <i className="fas fa-headset text-4xl text-yellow-400"></i>
//             </div>
//             <h3 className="text-xl font-semibold text-black">24/7 Support</h3>
//             <p className="text-gray-600">
//               Our customer support team is here to assist you anytime, day or night.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Features;
