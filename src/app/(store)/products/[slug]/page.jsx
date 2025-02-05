import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { Button } from "@/components/ui/button";
import AddToBasketButton from "@/components/AddToBasketButton";

async function ProductPage({ params }) {
  const { slug } = params; // Extract slug from params
  const product = await getProductBySlug(slug); // Fetch the product based on the slug

  if (!product || !product.data) {
    return notFound(); // Show a 404 page if the product is not found
  }

  const isOutOfStock = product.data.stock != null && product.data.stock <= 0; // Check if the product is out of stock

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        {product.data.image && (
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
            <Image
              src={urlFor(product.data.image).url()} // Ensure urlFor is defined
              alt={product.data.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white font-bold text-lg">Out of Stock</span>
              </div>
            )}
          </div>
        )}

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          {/* Name */}
          <h1 className="text-2xl font-bold mb-4">{product.data.name ?? "Unnamed Product"}</h1>

          {/* Description */}
          <p className="text-gray-700 mb-4">{product.data.description ?? "No description available."}</p>

          {/* Price */}
          <div className="text-xl font-semibold text-gray-900 mb-6">
            {product.data.price ? `$${product.data.price.toFixed(2)}` : "Price not available"}
          </div>

          {/* Add to Basket */}
          <div className="mt-6">
            <AddToBasketButton product={product.data} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;



// import { notFound } from "next/navigation";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
// import { Button } from "@/components/ui/button";
// import AddToBasketButton from "@/components/AddToBasketButton";

// async function ProductPage({ params }: { params: { slug: string } }) {
//   const { slug } = params;
//   const product = await getProductBySlug(slug);

//   if (!product || !product.data) {
//     return notFound();
//   }

//   const isOutOfStock = product.data.stock != null && product.data.stock <= 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         {product.data.image && (
//           <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
//             <Image
//               src={urlFor(product.data.image).url()}
//               alt={product.data.name ?? "Product image"}
//               fill
//               className="object-contain transition-transform duration-300 hover:scale-105"
//             />
//             {isOutOfStock && (
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <span className="text-white font-bold text-lg">Out of Stock</span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Product Details */}
//         <div className="flex flex-col justify-between">
//           {/* Name */}
//           <h1 className="text-2xl font-bold mb-4">{product.data.name ?? "Unnamed Product"}</h1>

//           {/* Description */}
//           <p className="text-gray-700 mb-4">{product.data.description ?? "No description available."}</p>

//           {/* Price */}
//           <div className="text-xl font-semibold text-gray-900 mb-6">
//             {product.data.price ? `$${product.data.price.toFixed(2)}` : "Price not available"}
//           </div>

//           {/* Add to Basket */}
//           <div className="mt-6">
//             <AddToBasketButton product={product.data} disabled={isOutOfStock} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;


