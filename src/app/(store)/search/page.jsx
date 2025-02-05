


import ProductGrid from "@/components/ProductGrid";
import SearchProductsByName from "@/sanity/lib/products/SearchProductsByName";

export default async function SearchPage({ searchParams }) {
  const { query } = searchParams;
  const products = await SearchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-6">No products found for: {query}</h1>
          <p className="text-gray-600">Try searching with different keywords.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Search Page</h1>
      <p className="mb-6">
        Search results for: <span className="font-medium text-blue-600">{query}</span>
      </p>
      <div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

// import ProductGrid from "@/components/ProductGrid";
// import SearchProductsByName from "@/sanity/lib/products/SearchProductsByName";

// export default async function SearchPage({
//   searchParams,
// }: {
//   searchParams: { query: string };
// }) {
//   const { query } = searchParams;
//   const products = await SearchProductsByName(query);

//   if (!products.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center">
//           <h1 className="text-3xl font-bold mb-6">No products found for: {query}</h1>
//           <p className="text-gray-600">Try searching with different keywords.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50">
//       <h1 className="text-2xl font-bold mb-4">Search Page</h1>
//       <p className="mb-6">
//         Search results for: <span className="font-medium text-blue-600">{query}</span>
//       </p>
//       <div>
//         <ProductGrid products={products} />
//       </div>
//     </div>
//   );
// }


// import ProductGrid from "@/components/ProductGrid";
// import SearchProductsByName from "@/sanity/lib/products/SearchProductsByName";
// import Image from "next/image";

// export default async function SearchPage({
//   searchParams,
// }: {
//   searchParams: { query: string };
// }) {
//   const { query } = searchParams;
//   const products = await SearchProductsByName(query);

//   if (!products.length) {
//     return (
//       <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center">
//           <h1 className="text-3xl font-bold mb-6">No products found for: {query}</h1>
//           <p className="text-gray-600">Try searching with different keywords.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Search Page</h1>
//       <p className="mb-6">
//         Search results for: <span className="font-medium text-blue-600">{query}</span>
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//         <ProductGrid products={products} />

//       </div>
//     </div>
//   );
// }


