import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-12 mt-20 shadow-lg">
      <div className="flex w-full bg-white h-1 mb-6"></div>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-3xl font-bold">Ammerahs</h3>
            <p className="text-gray-300">
              Our mission is to deliver exceptional products and services to our customers. Explore exclusive offers and get the best deals today!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white transition duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="text-white font-semibold">Email:</span> support@ameeerahs.com
              </li>
              <li className="text-gray-300">
                <span className="text-white font-semibold">Phone:</span> +1 234 567 890
              </li>
              <li className="text-gray-300">
                <span className="text-white font-semibold">Address:</span> 123 Main St, City, Country
              </li>
          </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Ammerahs. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import React from "react";  ashar
// import Link from "next/link";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white text-gray-700 py-12 mt-20 shadow-md">
//         <div className="flex w-full bg-black h-2 mb-5">

//         </div>
//       <div className="container mx-auto px-6 md:px-12 lg:px-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {/* Company Section */}
//           <div className="flex flex-col space-y-4">
//             <h3 className="text-2xl font-bold text-black">Quollex</h3>
//             <p className="text-gray-600">
//               Our mission is to deliver exceptional products and services to
//               our customers. Explore exclusive offers and get the best deals
//               today!
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="text-gray-600 hover:text-black transition duration-300"
//               >
//                 <FaFacebook className="w-6 h-6" />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-600 hover:text-black transition duration-300"
//               >
//                 <FaTwitter className="w-6 h-6" />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-600 hover:text-black transition duration-300"
//               >
//                 <FaInstagram className="w-6 h-6" />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-600 hover:text-black transition duration-300"
//               >
//                 <FaLinkedin className="w-6 h-6" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links Section */}
//           <div className="flex flex-col space-y-4">
//             <h3 className="text-xl font-semibold text-black">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-gray-600 hover:text-black transition duration-300"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/shop"
//                   className="text-gray-600 hover:text-black transition duration-300"
//                 >
//                   Shop
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-gray-600 hover:text-black transition duration-300"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/privacy"
//                   className="text-gray-600 hover:text-black transition duration-300"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Section */}
//           <div className="flex flex-col space-y-4">
//             <h3 className="text-xl font-semibold text-black">Contact Us</h3>
//             <ul className="space-y-2">
//               <li className="text-gray-600">
//                 <span className="text-black">Email:</span> support@quollex.com
//               </li>
//               <li className="text-gray-600">
//                 <span className="text-black">Phone:</span> +1 234 567 890
//               </li>
//               <li className="text-gray-600">
//                 <span className="text-black">Address:</span> 123 Main St, City,
//                 Country
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-300 mt-12 pt-6 text-center">
//           <p className="text-gray-600 text-sm">
//             &copy; {new Date().getFullYear()} Quollex. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
