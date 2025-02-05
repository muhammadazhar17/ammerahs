const HeroSection = () => {
    return (
      <section className="relative flex items-center justify-center h-screen bg-gradient-to-r from-green-200 via-purple-200 to-gray-800  text-gray-900 text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
            Elevate Your Online Presence
          </h1>
          <p className="mt-4 text-lg text-gray-700 md:text-xl">
            Build stunning, high-performance websites with modern technology.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
              Shop
            </button>
            <button className="px-6 py-3 text-lg font-semibold border border-gray-600 text-gray-900 rounded-lg hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;

// import React from "react";    ashar 
// import Image from "next/image"; // Ensure Image is imported from next/image

// const Hero: React.FC = () => {
//     return (
//         <div className="bg-gradient-to-r from-white to-gray-200 text-gray-900 py-20">
//             <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-20">
//                 {/* Text Section */}
//                 <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left space-y-6">
//                     <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-800">
//                         Elevate Your Style with <span className="text-blue-500">Exclusive Deals</span>
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-600">
//                         Explore our collection of premium products designed just for you. Shop now and enjoy special offers today!
//                     </p>
//                     <div className="flex flex-col md:flex-row gap-4">
//                         <button className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out">
//                             Shop Now
//                         </button>
//                         <button className="px-8 py-3 bg-transparent border-2 border-gray-300 text-gray-800 text-lg font-semibold rounded-lg hover:bg-blue-600 hover:border-blue-600 hover:text-white transition duration-300 ease-in-out">
//                             Learn More
//                         </button>
//                     </div>
//                 </div>

//                 {/* Image Section */}
//                 <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center relative">
//                     <Image
//                         className="w-full md:w-4/5 mx-auto rounded-lg shadow-xl transform hover:scale-105 transition duration-500 ease-in-out"
//                         src="/hero.jpg"
//                         alt="Hero"
//                         height={500}
//                         width={500}
//                     />
//                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white to-transparent opacity-50 rounded-lg"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Hero;

