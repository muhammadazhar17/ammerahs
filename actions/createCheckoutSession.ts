

"use server";

import stripe from "@/lib/stripe";
import { BasketItem } from "../store/store"; // Assuming this import is correct
import { imageUrl } from "@/lib/imageUrl";

// Define the type for a grouped basket item
export type GroupedBasketItem = {
  product: BasketItem;
  quantity: number; // Quantity of the product
};

// Define the Metadata type
export type Metadata = {
  orderNumber: string; // Order number for tracking
  customerName: string; // Customer's name
  customerEmail: string; // Customer's email
  ClerkUserId: string; // Clerk user ID (if applicable)
};

// Function to create a checkout session
export default async function createCheckoutSession(
  items: GroupedBasketItem[], // Takes in an array of grouped items
  metadata: Metadata // Takes in the metadata
): Promise<string | null> { // Return type is Promise<string | null>
  try {
    // Check if all items have a valid price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Retrieve customer by email
    const existingCustomers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId = existingCustomers.data.length > 0 
      ? existingCustomers.data[0].id 
      : undefined;

    // Base URL for redirecting after checkout
    const baseUrl = process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/basket`;

    console.log("🔹 SUCCESS URL:", successUrl);
    console.log("🔹 CANCEL URL:", cancelUrl);

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: customerId ? undefined : metadata.customerEmail,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        quantity: Math.max(1, item.quantity), // Ensure at least 1 quantity
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          // unit_amount:{item.product.price},
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `productId:${item.product._id}`, 
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
      })),
    });

    console.log("✅ Stripe Session Created:", session.url); // Log the session URL for debugging
    return session.url; // Return the checkout session URL
  } catch (error) {
    console.error("❌ Error creating checkout session:", error); // Log any errors
    throw error; // Throw the error if session creation fails
  }
}



// "use server";

// import stripe from "@/lib/stripe";
// import { BasketItem } from "../store/store"; // Assuming this import is correct
// import { imageUrl } from "@/lib/imageUrl";

// // Define the type for a grouped basket item
// export type GroupedBasketItem = {
//   product: BasketItem; // Reference to the BasketItem type
//   quantity: number; // Quantity of the product
// };

// // Define the Metadata type
// export type Metadata = {
//   orderNumber: string; // Order number for tracking
//   customerName: string; // Customer's name
//   customerEmail: string; // Customer's email
//   ClerkUserId: string; // Clerk user ID (if applicable)
// };

// // Function to create a checkout session
// export default async function createCheckoutSession(
//   items: GroupedBasketItem[], // Takes in an array of grouped items
//   metadata: Metadata // Takes in the metadata
// ): Promise<string | null> { // Return type is Promise<string | null>
//   try {
//     // Check if all items have a valid price
//     const itemsWithoutPrice = items.filter((item) => !item.product.price);
//     if (itemsWithoutPrice.length > 0) {
//       throw new Error("Some items do not have a price");
//     }

//     // Retrieve customer by email
//     const customers = await stripe.customers.list({
//       email: metadata.customerEmail,
//       limit: 1,
//     });

//     let customerId: string | undefined;
//     if (customers.data.length > 0) {
//       customerId = customers.data[0].id; // Use existing customer ID
//     }

//     // Base URL for redirecting after checkout
//     const baseUrl = process.env.NODE_ENV === "production"
//       ? `https://${process.env.VERCEL_URL}`
//       : process.env.NEXT_PUBLIC_BASE_URL;

//     const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
//     const cancelUrl = `${baseUrl}/basket`;

//     console.log("SUCCESS URL:", successUrl);
//     console.log("CANCEL URL:", cancelUrl);

//     // Create the checkout session
//     const session = await stripe.checkout.sessions.create({
//       customer: customerId,
//       customer_creation: customerId ? undefined : "always",
//       customer_email: customerId ? undefined : metadata.customerEmail,
//       metadata,
//       mode: "payment",
//       allow_promotion_codes: true,
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//       line_items: items.map((item) => ({
//         quantity: item.quantity, // Quantity of the product
//         price_data: {
//           currency: "usd", // Set your preferred currency
//           unit_amount: Math.round(item.product.price * 100 ) ,

//           // unit_amount: Math.round(item.product.price * 100 .item.quantity), // Price in cents

//           product_data: {
//             name: item.product.name || "Unnamed Product", // Default name if not provided
//             description: `productId:${item.product._id}`, // Include product ID in the description
//             metadata: {
//               id: item.product._id, // Store the product ID in metadata
//             },
//             images: item.product.image
//               ? [imageUrl(item.product.image).url()] // Generate the image URL if available
//               : [], // No images if not provided
//           },
//         },
//       })),
//     });

//     console.log(" Stripe Session Created:", session.url); // Log the session URL for debugging
//     return session.url; // Return the checkout session URL
//   } catch (error) {
//     console.error(" Error creating checkout session:", error); // Log any errors
//     throw error; // Throw the error if session creation fails
//   }
// }


// "use server";

// import stripe from "@/lib/stripe";
// import { BasketItem } from "../store/store"; // Assuming this import is correct
// import { imageUrl } from "@/lib/imageUrl";

// // Define the type for a grouped basket item (should match what you're using in your store)
// export type GroupedBasketItem = {
//   product: BasketItem; // Corrected to reference the BasketItem type
//   quantity: number;
// };

// // Define the Metadata type (already correct)
// export type Metadata = {
//   orderNumber: string;
//   customerName: string;
//   customerEmail: string;
//   ClerkUserId: string;
// };

// // Function to create a checkout session (async)
// export default async function createCheckoutSession(
//   items: GroupedBasketItem[], // Takes in an array of grouped items
//   metadata: Metadata          // Takes in the metadata
// ): Promise<string | null> {  // Return type is Promise<string | null>
//   try {
//     const itemsWithoutPrice = items.filter((item) => !item.product.price);
//     if (itemsWithoutPrice.length > 0) {
//       throw new Error("Some items do not have a price");
//     }

//     // Retrieve customer by email
//     const customers = await stripe.customers.list({
//       email: metadata.customerEmail,
//       limit: 1,
//     });

//     let customerId: string | undefined;
//     if (customers.data.length > 0) {
//       customerId = customers.data[0].id;
//     }



//       const baseUrl = process.env.NODE_ENV === "production"
//       ? `https://${process.env.VERCEL_URL}`: 
//       `${process.env.NEXT_PUBLIC_BASE_URL}`

//       const successUrl =  `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`

//     // const successUrl =  `${`${process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` }` || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`






//     const cancelUrl =`${baseUrl}/basket`
    



//     // const cancelUrl = `${`${process.env.VERCEL_URL  && `https://${process.env.VERCEL_URL}`}` || process.env.NEXT_PUBLIC_BASE_URL}/basket`

//     console.log("SUCCESS URL <<<<<<",successUrl)
//     console.log("CANCEL URL <<<<<<",cancelUrl)


//     // Create the checkout session
//     const session = await stripe.checkout.sessions.create({
//       customer: customerId,
//       customer_creation: customerId ? undefined : "always",
//       customer_email: customerId ? undefined : metadata.customerEmail,
//       metadata,
//       mode: "payment",
//       allow_promotion_codes: true,
//       // success_url: `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
//       success_url:successUrl,
//       cancel_url: cancelUrl,
//       // `${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/basket`,
//       line_items: items.map((item) => ({
//         quantity: item.quantity,
//         price_data: {
//           currency: "usd", // Set your preferred currency
//           unit_amount: Math.round(item.product.price * 1.0), // Convert price to cents
//           product_data: {
//             name: item.product.name || "Unnamed Product", // Default to "Unnamed Product" if no name is provided
//             description: `productId:${item.product._id}`, // Include product ID in the description
//             metadata: {
//               id: item.product._id, // Store the product ID in metadata
//             },
//             images: item.product.image
//               ? [imageUrl(item.product.image).url()] // Generate the image URL if available
//               : undefined, // No images if not provided
//           },
//         },
//       })),
//     });

//     return session.url; // Return the checkout session URL
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     throw error; // Throw the error if session creation fails
//   }
// }



// "use server"

// import stripe from "@/lib/stripe";
// import { BasketItem } from "../store/store"; // Assuming this import is correct
// import { imageUrl } from "@/lib/imageUrl";

// // Define the type for a grouped basket item (should match what you're using in your store)
// export type GroupedBasketItem = {
//   product: BasketItem; // Corrected to reference the BasketItem type
//   quantity: number;
// };

// // Define the Metadata type (already correct)
// export type Metadata = {
//   orderNumber: string;
//   customerName: string;
//   customerEmail: string;
//   ClerkUserId: string;
// };

// // Function to create a checkout session (async)
// export default async function createCheckoutSession(
//   items: GroupedBasketItem[], // Takes in an array of grouped items
//   metadata: Metadata          // Takes in the metadata
// ) {
//   // Example logic to create a checkout session (this is where you would implement your backend logic)
// try{

//     const itemsWithoutPrice= items.filter((item)=> !item.product.price)
//     if(itemsWithoutPrice.length > 0){
//         throw new Error("Some items donot have a price")
//     }

//     const customers = await stripe.customers.list({
//       email:metadata.customerEmail,
//       limit:1
//     })

//     let customerId: string | undefined;
//     if (customers.data.length > 0){
//       customerId = customers.data[0].id;
//     }


 

//     const session = await stripe.checkout.sessions.create({
//       customer: customerId,
//       customer_creation: customerId ? undefined : "always",
//       customer_email: customerId ? undefined : metadata.customerEmail,
//       metadata,
//       mode: "payment",
//       allow_promotion_codes: true,



//       success_url: `${`https://${process.env.VERCEL_URL}` ||process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`, 


//       cancel_url: `${`https://${process.env.VERCEL_URL}`||process.env.NEXT_PUBLIC_BASE_URL}/basket `, 
//       line_items: items.map((item) => ({
//         quantity:item.quantity,
//         price_data: {
//           currency: "usd", // Set your preferred currency
//           unit_amount: Math.round(item.product.price * 1), // Price in cents
//           product_data: {
//             name: item.product.name || "Unnamed Product", // Default to "Unnamed Product" if no name is provided
//             description: `productId:${item.product._id}`, // Include product ID in the description
//             metadata: {
//               id: item.product._id, // Store the product ID in metadata
//             },
//             images: item.product.image
//               ? [imageUrl(item.product.image).url()] // Generate the image URL if available
//               : undefined, // No images if not provided
//           },
//         },
       
        

//       })),
//     });
    
//     return session.url


// }catch (error) {
//     console.error("Error creating checkout session:", error);
//     throw error; 
//   }
// }




