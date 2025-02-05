"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import useBasketStore from "../../../../store/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddToBasketButton from "@/components/AddToBasketButton";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import createCheckoutSession from "../../../../actions/createCheckoutSession";
import { GroupedBasketItem } from "../../../../actions/createCheckoutSession"; // Ensure the correct import path
import { error } from "console";

export default function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const user = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // Calculate total price
  const calculateTotalPrice = () => {
    return groupedItems.reduce((total, item) => {
      return total + (item.product.price ?? 0) * item.quantity;
    }, 0);
  };

  // Handle checkout
  const handleProceedToCheckout = async () => {
    if (!isSignedIn) {
      // If the user is not signed in, redirect to the sign-in page
      return;
    }

    setIsLoading(true);
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user.user?.fullName ?? "unknown",
        customerEmail: user.user?.emailAddresses?.[0]?.emailAddress ?? "unknown",
        ClerkUserId: user.user?.id ?? "unknown",
      };

      // Pass the grouped items as the proper type (GroupedBasketItem)
      const sessionUrl = await createCheckoutSession(groupedItems as unknown as GroupedBasketItem[], metadata);

      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!groupedItems || groupedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-2xl font-semibold text-gray-700">Your basket is empty</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">
              {item.product.image && (
                <Image
                  src={imageUrl(item.product.image).url()}
                  alt={item.product.name || "Product image"}
                  width={96}
                  height={96}
                />
              )}
              <div className="flex flex-col ml-4">
                <p>{item.product.name}</p>
                <p className="text-sm sm:text-base">
                  Price: ${(item.product.price ?? 0).toFixed(2)} x {item.quantity}
                </p>
                <p className="text-sm sm:text-base">
                  Subtotal: ${(item.product.price ?? 0 * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="mt-6 p-4 border-t border-gray-300">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total Price:</span>
          <span>${calculateTotalPrice().toFixed(2)}</span>
        </div>
        <button
          onClick={handleProceedToCheckout}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-200"
        >
          {isLoading ? "Loading..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
}




// "use client";
// import { SignInButton } from "@clerk/nextjs";
// import { useAuth, useUser } from "@clerk/nextjs";
// import useBasketStore from "../../../../store/store";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image";
// import { imageUrl } from "@/lib/imageUrl";
// import createCheckoutSession from "../../../../actions/createCheckoutSession";
// import { GroupedBasketItem } from "../../../../actions/createCheckoutSession";
// import { Metadata } from "../../../../actions/createCheckoutSession"; // Adjust path based on your project structure

//  // Ensure the correct import path

// export default function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems());
//   const { isSignedIn } = useAuth();
//   // const user = useUser();
//   const router = useRouter();
//   const { user } = useUser(); // Get user authentication status and user object


//   const [isLoading, setIsLoading] = useState(false);

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     return groupedItems.reduce((total, item) => {
//       return total + (item.product.price ?? 0) * item.quantity;
//     }, 0);
//   };

//   // // Handle checkout
//   // const handleProceedToCheckout = async () => {
//   //   if (!isSignedIn) {
//   //     // If the user is not signed in, redirect to the sign-in page
//   //     // router.push();
//   //     router.push("https://your-clerk-instance.clerk.accounts.dev/sign-in");

//   //     return;
//   //   }

//   const handleCheckout = async () => {
//     if (isSignedIn && user) {
//       setIsLoading(true);
//       try {
//         const metadata: Metadata = {
//           orderNumber: crypto.randomUUID(),
//           customerName: user.fullName ?? "unknown",
//           customerEmail: user.emailAddresses?.[0]?.emailAddress ?? "unknown", // Access the first email safely
//           ClerkUserId: user!.id,
//         };

//     // setIsLoading(true);
//     // try {
//     //   const metadata = {
//     //     orderNumber: crypto.randomUUID(),
//     //     customerName: user.user?.fullName ?? "unknown",
//     //     customerEmail: user.user?.emailAddresses?.[0]?.emailAddress ?? "unknown",
//     //     ClerkUserId: user.user?.id ?? "unknown",
//     //   };

//       // Pass the grouped items as the proper type (GroupedBasketItem)
//       const sessionUrl = await createCheckoutSession(groupedItems as unknown as GroupedBasketItem[], metadata);

//       if (sessionUrl) {
//         window.location.href = sessionUrl;
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!groupedItems || groupedItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-2xl font-semibold text-gray-700">Your basket is empty</p>
//         <button
//           onClick={() => router.push("/")}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

 

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row flex-grow">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">
//               {item.product.image && (
//                 <Image
//                   src={imageUrl(item.product.image).url()}
//                   alt={item.product.name || "Product image"}
//                   width={96}
//                   height={96}
//                 />
//               )}
//               <div className="flex flex-col ml-4">
//                 <p>{item.product.name}</p>
//                 <p className="text-sm sm:text-base">
//                   Price: ${(item.product.price ?? 0).toFixed(2)} x {item.quantity}
//                 </p>
//                 <p className="text-sm sm:text-base">
//                   Subtotal: ${(item.product.price ?? 0 * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//               <div className="flex items-center ml-4 flex-shrink-0">
//                 <AddToBasketButton product={item.product} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Order Summary Section */}
//       <div className="mt-6 p-4 border-t border-gray-300">
//         <div className="flex justify-between text-xl font-semibold">
//           <span>Total Price:</span>
//           <span>${calculateTotalPrice().toFixed(2)}</span>
//         </div>
//         <button
//           onClick={handleCheckout}
//           disabled={isLoading}
//           className="mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-200"
//         >
//           {isLoading ? "Loading..." : "Proceed to Checkout"}
//         </button>
//         <div>
//         {isSignedIn ? (
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white py-2 px-6 rounded-lg"
//           >
//             {isLoading ? "Loading..." : "Proceed to Checkout"}
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-6">
//           <SignInButton>
//             <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
//               Sign In to Checkout
//             </button>
//           </SignInButton>
//         </div>
//       )}
//         </div>
//       </div>
//     </div>
//   );
// }
// }

// "use client"

// import { useAuth, useUser } from "@clerk/nextjs";
// import useBasketStore from "../../../../store/store";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image";
// import { imageUrl } from "@/lib/imageUrl";
// import createCheckoutSession from "../../../../actions/createCheckoutSession";

// export default function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems());
//   const { isSignedIn } = useAuth();
//   const user = useUser();
//   const router = useRouter();

//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const calculateTotalPrice = () => {
//     return groupedItems.reduce((total, item) => {
//       return total + (item.product.price ?? 0) * item.quantity;
//     }, 0);
//   };

//   const handleProceedToCheckout = async () => {
//     setIsLoading(true);
//     try {
//       // Call the server to create a Stripe Checkout session
//       const metadata = {
//         orderNumber: crypto.randomUUID(),
//         customerName: user.user?.fullName ?? "unknown",
//         customerEmail: user.user?.emailAddresses?.[0]?.emailAddress ?? "unknown",
//         ClerkUserId: user.user?.id ?? "unknown",
//       };
//       const session = await createCheckoutSession(groupedItems, metadata);
//       // Redirect to Stripe Checkout session
//       window.location.href = session.url;
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!groupedItems || groupedItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-2xl font-semibold text-gray-700">Your basket is empty</p>
//         <button
//           onClick={() => router.push("/")}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row flex-grow">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">
//               {item.product.image && (
//                 <Image
//                   src={imageUrl(item.product.image).url()}
//                   alt={item.product.name || "Product image"}
//                   width={96}
//                   height={96}
//                 />
//               )}
//               <div className="flex flex-col ml-4">
//                 <p>{item.product.name}</p>
//                 <p className="text-sm sm:text-base">
//                   Price: ${(item.product.price ?? 0 * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//               <div className="flex items-center ml-4 flex-shrink-0">
//                 <AddToBasketButton product={item.product} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Order Summary Section */}
//       <div className="mt-6 p-4 border-t border-gray-300">
//         <div className="flex justify-between text-xl font-semibold">
//           <span>Total Price:</span>
//           <span>${calculateTotalPrice().toFixed(2)}</span>
//         </div>
//         <button
//           onClick={handleProceedToCheckout}
//           disabled={isLoading}
//           className="mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-200"
//         >
//           {isLoading ? "Loading..." : "Proceed to Checkout"}
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { SignInButton, useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import useBasketStore from "../../../../store/store";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image"; // Import Next.js Image component
// import { imageUrl } from "@/lib/imageUrl";
// import { Metadata } from "../../../../actions/createCheckoutSession";

// // Define the Metadata type


// function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems()); // Fetch grouped items from the basket store
//   const { isSignedIn, user } = useUser(); // Get user authentication status and user object
//   const router = useRouter(); // Router instance for navigation

//   const [isClient, setIsClient] = useState(false); // State to check client-side rendering
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Wait for client to mount
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return <div>ERROR</div>;
//   }

//   const handleCheckout = async () => {
//     if (isSignedIn && user) {
//       setIsLoading(true);
//       try {
//         const metadata: Metadata = {
//           orderNumber: crypto.randomUUID(),
//           customerName: user.fullName ?? "unknown",
//           customerEmail: user.emailAddresses?.[0]?.emailAddress ?? "unknown", // Access the first email safely
//           ClerkUserId: user.id,
//         };




//         const checkoutUrl = await createCheckoutsession(groupedItems, metadata)
//         if(checkoutUrl){
//           window.location.href = checkoutUrl
//         }
//       }  
      

//       catch (error) {
//         console.error("Error While creating Checkout Session",error);
//       } finally {
//         setIsLoading(false);
//       }
//     } 
//   };

//   if (groupedItems.length === 0) {
//     // Display message when the basket is empty
//     return (
//       <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//         <p className="text-gray-600 text-lg">Your basket is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 h-[full]">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex items-center justify-between border-b pb-4 mb-4"
//             >
//               {/* Display Product Image */}
//               <div className="w-24 h-24 relative">
//                 {item.product.image && (
//                   <Image
//                     src={imageUrl(item.product.image).url()} // Ensure the product image URL is correct
//                     alt={item.product.name ?? "product image"}
//                     className="w-full h-full rounded object-cover"
//                     width={96}
//                     height={96}
//                   />
//                 )}
//               </div>

//               {/* Display Product Details */}
//               <div className="flex-grow ml-4">
//                 <h2 className="text-lg font-semibold">{item.product.name}</h2>
//                 <AddToBasketButton product={item.product} />
//               </div>

//               {/* Display Price */}
//               <p className="text-lg font-bold">
//                 ${item.product.price ? (item.product.price * item.quantity).toFixed(2) : "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full lg:w-1/3 mt-6 lg:mt-0 p-4 bg-gray-100 border rounded-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Items:</span>
//               <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
//             </div>

//             {/* Uncomment this if you want to display total cost */}
//             <div className="flex justify-between border-t mt-4 pt-4 font-semibold">
//               <span>Total</span>
//               <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       {isSignedIn ? (
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white py-2 px-6 rounded-lg"
//           >
//             {isLoading ? "Loading..." : "Proceed to Checkout"}
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-6">
//           <SignInButton>
//             <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
//               Sign In to Checkout
//             </button>
//           </SignInButton>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BasketPage;
///////////////////////////////////////////////////////////////////////////////////////////////


// "use client";

// import { SignInButton, useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import useBasketStore from "../../../../store/store";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image"; // Import Next.js Image component
// import { imageUrl } from "@/lib/imageUrl";
// import { BasketItem } from "../../../../store/store"; // Adjust the path as necessary

// import createCheckoutSession, { Metadata, GroupedBasketItem } from "../../../../actions/createCheckoutSession";

// // Function to map grouped items correctly
// function getGroupedItems(items: BasketItem[]): GroupedBasketItem[] {
//   const groupedItems: GroupedBasketItem[] = [];
//   const itemMap: { [key: string]: GroupedBasketItem } = {}; // To track products by ID

//   items.forEach((item) => {
//     const existingItem = itemMap[item._id];

//     if (existingItem) {
//       // If item already exists, increment the quantity
//       existingItem.quantity += 1;
//     } else {
//       // Otherwise, create a new entry with quantity 1
//       itemMap[item._id] = {
//         product: item,
//         quantity: 1,
//       };
//     }
//   });

//   // Convert itemMap to an array of GroupedBasketItem
//   for (const key in itemMap) {
//     groupedItems.push(itemMap[key]);
//   }

//   return groupedItems;
// }

// function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems()); // Fetch grouped items from the basket store
//   const { isSignedIn, user } = useUser(); // Get user authentication status and user object
//   const router = useRouter(); // Router instance for navigation

//   const [isClient, setIsClient] = useState(false); // State to check client-side rendering
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Wait for client to mount
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return <div>ERROR</div>;
//   }

//   const handleCheckout = async () => {
//     if (isSignedIn && user) {
//       setIsLoading(true);
//       try {
//         const metadata: Metadata = {
//           orderNumber: crypto.randomUUID(),
//           customerName: user.fullName ?? "unknown",
//           customerEmail: user.emailAddresses?.[0]?.emailAddress ?? "unknown", // Access the first email safely
//           ClerkUserId: user!.id,
//         };

//         // Get grouped items with their quantities
//         const groupedBasketItems = getGroupedItems(groupedItems);

//         // Create checkout session with the grouped items
//         const checkoutUrl = await createCheckoutSession(groupedBasketItems, metadata);

//         if (checkoutUrl) {
//           window.location.href = checkoutUrl;
//         }
//       } catch (error) {
//         console.error("Error While creating Checkout Session", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   if (groupedItems.length === 0) {
//     // Display message when the basket is empty
//     return (
//       <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//         <p className="text-gray-600 text-lg">Your basket is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 h-[full]">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex items-center justify-between border-b pb-4 mb-4"
//             >
//               {/* Display Product Image */}
//               <div className="w-24 h-24 relative">
//                 {item.product.image && (
//                   <Image
//                     src={imageUrl(item.product.image).url()} // Ensure the product image URL is correct
//                     alt={item.product.name ?? "product image"}
//                     className="w-full h-full rounded object-cover"
//                     width={96}
//                     height={96}
//                   />
//                 )}
//               </div>

//               {/* Display Product Details */}
//               <div className="flex-grow ml-4">
//                 <h2 className="text-lg font-semibold">{item.product.name}</h2>
//                 <AddToBasketButton product={item.product} />
//               </div>

//               {/* Display Price */}
//               <p className="text-lg font-bold">
//                 ${item.product.price ? (item.product.price * item.quantity).toFixed(2) : "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full lg:w-1/3 mt-6 lg:mt-0 p-4 bg-gray-100 border rounded-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Items:</span>
//               <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
//             </div>

//             {/* Uncomment this if you want to display total cost */}
//             <div className="flex justify-between border-t mt-4 pt-4 font-semibold">
//               <span>Total</span>
//               <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       {isSignedIn ? (
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white py-2 px-6 rounded-lg"
//           >
//             {isLoading ? "Loading..." : "Proceed to Checkout"}
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-6">
//           <SignInButton>
//             <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
//               Sign In to Checkout
//             </button>
//           </SignInButton>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BasketPage;




// "use client"
// import { SignInButton, useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import useBasketStore from "../../../../store/store";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image";
// import { imageUrl } from "@/lib/imageUrl";
// import { BasketItem } from "../../../../store/store"; // Adjust the path as necessary
// import createCheckoutSession, { Metadata, GroupedBasketItem } from "../../../../actions/createCheckoutSession";

// // Function to map grouped items correctly
// function getGroupedItems(items: BasketItem[]): GroupedBasketItem[] {
//   const groupedItems: GroupedBasketItem[] = [];
//   const itemMap: { [key: string]: GroupedBasketItem } = {}; // To track products by ID

//   items.forEach((item) => {
//     const existingItem = itemMap[item._id];

//     if (existingItem) {
//       // If item already exists, increment the quantity
//       existingItem.quantity += 1;
//     } else {
//       // Otherwise, create a new entry with quantity 1
//       itemMap[item._id] = {
//         product: item,
//         quantity: 1,
//       };
//     }
//   });

//   // Convert itemMap to an array of GroupedBasketItem
//   for (const key in itemMap) {
//     groupedItems.push(itemMap[key]);
//   }

//   return groupedItems;
// }

// function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems()); // Fetch grouped items from the basket store
//   const { isSignedIn, user } = useUser(); // Get user authentication status and user object

//   const [isClient, setIsClient] = useState(false); // State to check client-side rendering
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Wait for client to mount
//   useEffect(() => {
//     setIsClient(true);
//   }, []);


//   if (!isClient) {
//     return <div>ERROR</div>;
//   }

//   const handleCheckout = async () => {
//     if (isSignedIn && user) {
//       setIsLoading(true);
//       try {
//         const metadata: Metadata = {
//           orderNumber: crypto.randomUUID(),
//           customerName: user.fullName ?? "unknown",
//           customerEmail: user.emailAddresses?.[0]?.emailAddress ?? "unknown", // Access the first email safely
//           ClerkUserId: user!.id,
//         };

//         // Get grouped items with their quantities
//         const groupedBasketItems = getGroupedItems(groupedItems);

//         // Create checkout session with the grouped items
//         const checkoutUrl = await createCheckoutSession(groupedBasketItems, metadata);

//         if (checkoutUrl) {
//           window.location.href = checkoutUrl;
//         }
//       } catch (error) {
//         console.error("Error While creating Checkout Session", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   if (groupedItems.length === 0) {
//     // Display message when the basket is empty
//     return (
//       <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//         <p className="text-gray-600 text-lg">Your basket is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 h-[full]">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex items-center justify-between border-b pb-4 mb-4"
//             >
//               {/* Display Product Image */}
//               <div className="w-24 h-24 relative">
//                 {item.product.image && (
//                   <Image
//                     src={imageUrl(item.product.image).url()} // Ensure the product image URL is correct
//                     alt={item.product.name ?? "product image"}
//                     className="w-full h-full rounded object-cover"
//                     width={96}
//                     height={96}
//                   />
//                 )}
//               </div>

//               {/* Display Product Details */}
//               <div className="flex-grow ml-4">
//                 <h2 className="text-lg font-semibold">{item.product.name}</h2>
//                 <AddToBasketButton product={item.product} />
//               </div>

//               {/* Display Price */}
//               <p className="text-lg font-bold">
//                 ${item.product.price ? (item.product.price * item.quantity).toFixed(2) : "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full lg:w-1/3 mt-6 lg:mt-0 p-4 bg-gray-100 border rounded-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Items:</span>
//               <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
//             </div>

//             {/* Uncomment this if you want to display total cost */}
//             <div className="flex justify-between border-t mt-4 pt-4 font-semibold">
//               <span>Total</span>
//               <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       {isSignedIn ? (
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white py-2 px-6 rounded-lg"
//           >
//             {isLoading ? "Loading..." : "Proceed to Checkout"}
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-6">
//           <SignInButton>
//             <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
//               Sign In to Checkout
//             </button>
//           </SignInButton>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BasketPage;

////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { SignInButton, useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import useBasketStore from "../../../../store/store";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image"; // Import Next.js Image component
// import { imageUrl } from "@/lib/imageUrl";
// import { BasketItem } from "../../../../store/store"; // Adjust the path as necessary

// import createCheckoutSession, { Metadata, GroupedBasketItem } from "../../../../actions/createCheckoutSession";

// // Function to map grouped items correctly
// function getGroupedItems(items: BasketItem[]): GroupedBasketItem[] {
//   const groupedItems: GroupedBasketItem[] = [];
//   const itemMap: { [key: string]: GroupedBasketItem } = {}; // To track products by ID

//   items.forEach((item) => {
//     const existingItem = itemMap[item._id];

//     if (existingItem) {
//       // If item already exists, increment the quantity
//       existingItem.quantity += 1;
//     } else {
//       // Otherwise, create a new entry with quantity 1
//       itemMap[item._id] = {
//         product: item,
//         quantity: 1,
//       };
//     }
//   });

//   // Convert itemMap to an array of GroupedBasketItem
//   for (const key in itemMap) {
//     groupedItems.push(itemMap[key]);
//   }

//   return groupedItems;
// }

// function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems()); // Fetch grouped items from the basket store
//   const { isSignedIn, user } = useUser(); // Get user authentication status and user object
//   const router = useRouter(); // Router instance for navigation

//   const [isClient, setIsClient] = useState(false); // State to check client-side rendering
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Wait for client to mount
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return <div>ERROR</div>;
//   }

//   const handleCheckout = async () => {
//     if (isSignedIn && user) {
//       setIsLoading(true);
//       try {
//         const metadata: Metadata = {
//           orderNumber: crypto.randomUUID(),
//           customerName: user.fullName ?? "unknown",
//           customerEmail: user.emailAddresses?.[0]?.emailAddress ?? "unknown", // Access the first email safely
//           ClerkUserId: user!.id,
//         };

//         // Get grouped items with their quantities
//         const groupedBasketItems = getGroupedItems(groupedItems);

//         // Create checkout session with the grouped items
//         const checkoutUrl = await createCheckoutSession(groupedBasketItems, metadata);

//         if (checkoutUrl) {
//           window.location.href = checkoutUrl;
//         }
//       } catch (error) {
//         console.error("Error While creating Checkout Session", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   if (groupedItems.length === 0) {
//     // Display message when the basket is empty
//     return (
//       <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//         <p className="text-gray-600 text-lg">Your basket is empty.</p>
//       </div>
//     );
//   }


//   return (
//     <div className="container mx-auto p-4 h-[full]">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex items-center justify-between border-b pb-4 mb-4"
//             >
//               {/* Display Product Image */}
//               <div className="w-24 h-24 relative">
//                 {item.product.image && (
//                   <Image
//                     src={imageUrl(item.product.image).url()} // Ensure the product image URL is correct
//                     alt={item.product.name ?? "product image"}
//                     className="w-full h-full rounded object-cover"
//                     width={96}
//                     height={96}
//                   />
//                 )}
//               </div>

//               {/* Display Product Details */}
//               <div className="flex-grow ml-4">
//                 <h2 className="text-lg font-semibold">{item.product.name}</h2>
//                 <AddToBasketButton product={item.product} />
//               </div>

//               {/* Display Price */}
//               <p className="text-lg font-bold">
//                 ${item.product.price ? (item.product.price * item.quantity).toFixed(2) : "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary Section */}
//         <div className="w-full lg:w-1/3 mt-6 lg:mt-0 p-4 bg-gray-100 border rounded-md">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Items:</span>
//               <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
//             </div>

//             {/* Uncomment this if you want to display total cost */}
//             <div className="flex justify-between border-t mt-4 pt-4 font-semibold">
//               <span>Total</span>
//               <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       {isSignedIn ? (
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white py-2 px-6 rounded-lg"
//           >
//             {isLoading ? "Loading..." : "Proceed to Checkout"}
//           </button>
//         </div>
//       ) : (
//         <div className="flex justify-end mt-6">
//           <SignInButton>
//             <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
//               Sign In to Checkout
//             </button>
//           </SignInButton>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BasketPage;












// "use client";

// import { useAuth, useUser } from "@clerk/nextjs";
// import useBasketStore from "../../../../store/store";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image";
// import { imageUrl } from "@/lib/imageUrl";

// export default function BasketPage() {
//   const groupedItems = useBasketStore((state) => state.getGroupedItems());
//   const { isSignedIn } = useAuth();
//   const user = useUser();
//   const router = useRouter();

//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Ensure client-side rendering
//   }, []);

//   if (!groupedItems || groupedItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-2xl font-semibold text-gray-700">
//           Your basket is empty
//         </p>
//         <button
//           onClick={() => router.push("/")}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   console.log("Basket Contents:", groupedItems);

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
//       <div className="flex flex-col lg:flex-row flex-grow">
//         <div className="flex-grow">
//           {groupedItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="mb-4 p-4 border rounded-lg flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
//             >
//               <div className="flex items-center">
//                 {item.product.image && (
//                   <Image
//                     src={imageUrl(item.product.image).url()}
//                     alt={item.product.name || "Product image"}
//                     width={96}
//                     height={96}
//                     className="rounded-lg"
//                   />
//                 )}
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold">{item.product.name}</p>
//                   <p className="text-gray-600 text-sm">
//                     Price: ${item.product.price?.toFixed(2)}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     Quantity: {item.quantity}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center ml-4 flex-shrink-0">
//                 <AddToBasketButton product={item.product} />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto ">
//           <h3>order summary</h3>
//         </div>
//       </div>
//     </div>
//   );
// }
///////////////////***************************************** */

// "use client"

// import { useAuth, useUser } from "@clerk/nextjs";
// import useBasketStore from "../../../../store/store";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import AddToBasketButton from "@/components/AddToBasketButton";
// import Image from "next/image"
// import { imageUrl } from "@/lib/imageUrl";

// export default function BasketPage(){
//   const groupedItems= useBasketStore((state) => state.getGroupedItems() )
//   const { isSignedIn }  = useAuth()
//   const user =useUser()
//   const router = useRouter()

//   const [isClient, setIsClient] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   if(groupedItems)
//   // if (groupedItems.length === 0) {
//   //   return <div>Your basket is empty</div>;
//   //   }

//   if (groupedItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-2xl font-semibold text-gray-700">
//           Your basket is empty
//         </p>
//         <button
//           onClick={() => router.push("/")}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }
  
// console.log("Basket Contents ", groupedItems)
  
//   return( <div className="container mx-auto p-4 max-w-6xl">
//       <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
//       {/* <p className="text-sm sm:text-base">
//         Price: $
//         {((item.product.price ?? 0)*item.quantity ).toFixed(2)}
//       </p> */}
//       <div className="flex flex-col lg:flex-row flex-grow">
//         <div className="flex-grow">
//               {groupedItems?.map((item) =>(

//                {item.product.image &&( 
//                <Image
//                   src={imageUrl(item.product.image).url()}
//                   alt={item.product.name && "Product image"}
//                   width={96}
//                   height={96}
//                 />
//               )}
//                   <div key={item.product._id}
//                   className="mb-4 p-4 border rounded flex items-center justify-between"
//                   >
//                     <div>{item.product.name}</div>
//                     <p className="text-sm sm:text-base">
//                      Price: $
//                       {((item.product.price ?? 0)*item.quantity ).toFixed(2)}
//                       </p>
//                       <div className="flex items-center ml-4 flex-shrink-0">
//                         <AddToBasketButton  product={item.product}/>
//                       </div>
//                   </div>

//               ))}
//         </div>
//       </div>
//     </div>
//   )

// }




// import { persist } from "zustand/middleware";
// import { create } from "zustand";
// import { Product } from "../../../../sanity.types";

// export interface BasketItem {
//   image: any;
//   _id: any;
//   name: string;
//   product: Product;
//   quantity: number;
//   price: number;
// }

// interface BasketState {
//   items: BasketItem[];
//   addItem: (product: Product) => void;
//   removeItem: (productId: string) => void;
//   clearBasket: () => void;
//   getTotalPrice: () => number;
//   getItemCount: (productId: string) => number;
//   getGroupedItems: () => BasketItem[];
// }

// const useBasketStore = create<BasketState>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       // Add item to the basket
//       addItem: (product) => {
//         set((state) => {
//           const existingItem = state.items.find(
//             (item) => item.product._id === product._id
//           );
//           if (existingItem) {
//             // Increase quantity if the item already exists
//             return {
//               items: state.items.map((item) =>
//                 item.product._id === product._id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               ),
//             };
//           } else {
//             // Add new item with required properties
//             return {
//               items: [
//                 ...state.items,
//                 {
//                   product,
//                   quantity: 1,
//                   price: product.price ?? 0,
//                   image: product.image ?? null,
//                   _id: product._id ?? "",
//                   name: product.name ?? "",
//                 },
//               ],
//             };
//           }
//         });
//       },

//       // Remove item from the basket
//       removeItem: (productId) =>
//         set((state) => ({
//           items: state.items.reduce((acc, item) => {
//             if (item.product._id === productId) {
//               // Decrease quantity if more than 1
//               if (item.quantity > 1) {
//                 acc.push({ ...item, quantity: item.quantity - 1 });
//               }
//             } else {
//               acc.push(item);
//             }
//             return acc;
//           }, [] as BasketItem[]),
//         })),

//       // Clear the entire basket
//       clearBasket: () => {
//         set({ items: [] });
//       },

//       // Get total price of items in the basket
//       getTotalPrice: () => {
//         return get().items.reduce((total, item) => {
//           return total + (item.product.price ?? 0) * item.quantity;
//         }, 0);
//       },

//       // Get the quantity of a specific item
//       getItemCount: (productId) => {
//         const item = get().items.find((item) => item.product._id === productId);
//         return item ? item.quantity : 0;
//       },

//       // Get grouped items (all items in the basket)
//       getGroupedItems: () => {
//         return get().items;
//       },
//     }),
//     {
//       name: "basket-store", // Key for local storage persistence
//     }
//   )
// );

// export default useBasketStore;


// import { persist } from "zustand/middleware";
// import { create } from "zustand";
// import { Product } from "../../../../sanity.types";

// export interface BasketItem {
//   image: any;
//   _id: any;
//   name: string;
//   product: Product;
//   quantity: number;
//   price:number
// }

// interface BasketState {
//   items: BasketItem[];
//   addItem: (product: Product) => void;
//   removeItem: (productId: string) => void;
//   clearBasket: () => void;
//   getTotalPrice: () => number;
//   getItemCount: (productId: string) => number;
//   getGroupedItems: () => BasketItem[];
// }
// /////////////////////////////////////////////////////////////////////////////////////////////
// const useBasketStore = create<BasketState>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (product) => {
//         set((state => {
//           const existingItem = state.items.find(
//             (item) => item.product._id === product._id
//           );
//           if (existingItem) {
//             return {
//               items: state.items.map((item) =>
//                 item.product._id === product._id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               ),
//             };
//           } else {
//             return {
//               items: [...state.items, { product, quantity: 1, price: product.price ?? 0 }],
//             };
//           }
//         });
//       },
// // ///////////////////////////////////////////////////////////////////////////////////////

//       removeItem: (productId) => 
//         set((state) => ({
//           items: state.items.reduce((acc,item) =>{
//             if  (item.product._id === productId){
//                 if(item.quantity > 1){
//                     acc.push({ ...item, quantity: item.quantity - 1 })
//                 }}else{
//                 acc.push(item)
//             }
//             return acc;
        
//             }, [] as BasketItem[])
//         })),
    
// ///////////////////////////////////////////////////////////////////////////////


//     clearBasket: () => {
//         set({ items: [] }); // This clears all items in the basket
//     },
    
//     getTotalPrice: () => {
//         return get().items.reduce((total, item) => {
//             return total + (item.product.price ?? 0) * item.quantity;
//         }, 0); // Start with an initial value of 0
//     },
    
    
// /////////////////////////////////////////////////////////////////////////////////////////////////    
 



// getItemCount: (productId) => {
//     const state = get();
//         const item = state.items.find(
//           (item) => item.product._id === productId
//         );
//         return item ? item.quantity : 0;
//       },

   
// //////////////////////////////////////////////////////////////////////////////////////////////////////


//       getGroupedItems: () => {
//         const state = get();
//         return state.items;
//       },
//     }),
//     {
//       name: "basket-store",
//     }
//   )
// );

// export default useBasketStore;











