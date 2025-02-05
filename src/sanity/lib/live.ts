// // Querying with "sanityFetch" will keep content automatically updated
// // Before using it, import and render "<SanityLive />" in your layout, see
// // https://github.com/sanity-io/next-sanity#live-content-api for more information.
// import { defineLive } from "next-sanity";
// import { client } from './client'
// import "server-only"

// const token = process.env.SANITY_API_READ_TOKEN
// if (!token) { 
//   throw new Error('Missing SANITY_API_READ_TOKEN')
// }


// export const { sanityFetch, SanityLive } = defineLive({ 

//   client,
//   serverToken: token,
//   browserToken: token,
//   fetchOptions: { 
//     revalidate:0,
//   }



// })

import { defineLive } from "next-sanity";
import { client } from "./client";
import "server-only";

// Ensure the API read token is set in the environment variables
const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN in environment variables");
}

// Define Sanity's live functionality
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token, // Server-side token for secure API calls
  browserToken: token, // Token exposed to the browser (use cautiously)
  fetchOptions: {
    revalidate: 0, // Always fetch the latest content
  },
});
