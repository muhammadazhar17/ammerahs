import Link from "next/link";
import Image from "next/image";
import { Product } from "../../sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { Button } from "./ui/button";

function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <div>
            <Link href={`/products/${product.slug?.current}`}>
                <div
                    className={`group flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out ${isOutOfStock ? "opacity-50" : ""}`}
                >
                    <div className="relative aspect-square h-full overflow-hidden w-full">
                        {product.image && (
                            <Image
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                src={imageUrl(product.image).url()}
                                alt={product.name || "Product Image"}
                                width={500}
                                height={500}
                            />
                        )}

                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-black text-xl font-bold z-10">
                                 Out of stock.
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <h1 className="text-lg">{product.name}</h1>
                        <p className="text-xs text-slate-500">
                            {Array.isArray(product.description)
                                ? product.description
                                      .filter((block) => block._type === "block")
                                      .map((block) =>
                                          block.children?.map((child: { text: string }) => child.text).join("")
                                      )[0] || "No description found"
                                : product.description || "No description found"}
                        </p>

                        <p>${product.price?.toFixed(2)}</p>
                        <div>
  <Button className="bg-black text-blue-400 font-extrabold">Add To Basket</Button>
</div>

                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProductThumb;


// import Link from "next/link";
// import Image from "next/image";
// import { Product } from "../../sanity.types";
// import { imageUrl } from "@/lib/imageUrl";

// function ProductThumb({ product }: { product: Product }) {
//     const isOutOfStock = product.stock != null && product.stock <= 0;

//     return (
//         <div>
//                 <Link href={`/products/${product.slug?.current}`}>

//             <div
//                 className={`group flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out ${isOutOfStock ? "opacity-50" : ""}`}
//                 >
//                 <div className="relative aspect-square h-full overflow-hidden w-full">
//                     {product.image && (
//                         <Image
//                             className="object-contain transition-transform duration-300 group-hover:scale-105"
//                             src={imageUrl(product.image).url()}
//                             alt={product.name || "Product Image"}
//                             width={500}
//                             height={500}
//                             />
//                         )}

//                     {isOutOfStock && (
//                         <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-black text-xl font-bold z-10">
//                         Ops! It seems that the product is Out of stock.
//                         </div>
//                         )}
//                 </div>

//                 <div className="p-4">
//                     <h1 className="text-lg">{product.name}</h1>
//                     <p className="text-xs text-slate-500 ">
//                         {Array.isArray(product.description)
//                             ? product.description
//                                 .filter((block) => block._type === "block")
//                                 .map((block) =>
//                                     block.children?.map((child: { text: any; }) => child.text).join("")
//                             )[0] || "No description found"
//                             : product.description || "No description found"}
//                     </p>

//                     <p>${product.price?.toFixed(2)}</p>
//                 </div>
//             </div>

//             {/* Conditional Link Rendering */}
//             {/* {!isOutOfStock ? (
//                 <Link href={`/products/${product.slug?.current}`} className="block">
//                     <span className="sr-only">View {product.name}</span>
//                 </Link>
//             ) : (
//                 <div className="text-center text-gray-500 mt-2">
//                     This product is currently unavailable.
//                 </div>
//             )} */}
//             </Link>
//         </div>
//     );
// }

// export default ProductThumb;

// import Link from "next/link";
// import Image from "next/image";
// import { Product } from "../../sanity.types";
// import { imageUrl } from "@/lib/imageUrl";

// function ProductThumb({ product }: { product: Product }) {
//     const IsOutOfstock = product.stock != null && product.stock <= 0;
//     const description = product?.description
//     return (
//         <div>

//             <Link href={`/products/${product.slug?.current}`}
//                 className={`group flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out ${IsOutOfstock ? "opacity-50" : ""}`}
//             >

//                 <div className="relative aspect-square h-full overflow-hidden w-full">
//                     {product.image &&
//                         <Image className="object-contain transition-transform duration-300 group-hover:scale-105"
//                             src={imageUrl(product.image).url()}
//                             alt={product.name || "Product Image"}
//                             width={500}
//                             height={500}
//                         />
//                     }

//                     {IsOutOfstock && (

//                         <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-black text-xl font-bold z-10">
//                             Ops! ,It seems that the product is Out of stock.
//                         </div>

//                     )}
//                 </div>
//                 <div className="p-4">
//                     <h1 className="text-lg">
//                         {product.name}
//                     </h1>
//                     <p className="text-xs text-slate-500 ">
//                         {Array.isArray(product.description)
//                             ? product.description
//                                 .filter((block) => block._type === "block")
//                                 .map((block) =>
//                                     block.children?.map((child: { text: any; }) => child.text).join("")
//                                 )[0] || "No description found"
//                             : product.description || "No description found"}
//                     </p>

//                     <p>
//                         ${product.price?.toFixed(2)}
//                     </p>

//                 </div>
//             </Link>
//         </div>
//     );
// }


// export default ProductThumb;