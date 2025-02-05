import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

 const searchProductsByName = async (searchParam: string) => {
  // Define the query to search for products by name
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && name match $searchParam] | order(name asc)
  `);

  try {
    // Use Sanity client to fetch products based on the query
    const products = await sanityFetch ({
        query: PRODUCT_SEARCH_QUERY,
        params: { searchParam: `${searchParam}*` },
    });

    // Return the list of products, or an empty array if none are found
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name", error);
    return [];
  }
};

export default searchProductsByName;

// import { defineQuery } from "next-sanity"
// import { client } from "../client";

// export const SearchProductByName = async (searchParam: string   ) =>{
//     // const SEARCH_PRODUCT_QUERY = defineQuery(`
        
        
//     //     `)

// // }
// const SEARCH_PRODUCT_QUERY = defineQuery(`
//     *[_type == "product" && name match $searchParam] | order(name asc)
//     // {
//     //     _id,
//     //     name,
//     //     price,
//     //     description,
//     //     image
//     // }
// `);

// const products = await client.fetch(SEARCH_PRODUCT_QUERY, { searchParam });
// return products;
// };