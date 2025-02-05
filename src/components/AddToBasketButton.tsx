"use client";
import {  useState, useEffect } from "react";
import { Product } from "../../sanity.types";
import useBasketStore from "../../store/store";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToBasketButton({
  product,
  disabled,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Avoid rendering on the server side
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          itemCount === 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-100  hover:bg-gray-300"
        }`}
        disabled={itemCount === 0 || disabled}
      >
        -
      </button>
      <span className="text-xl font-bold">
        {itemCount === 0 ? (
          <span className="text-gray-400">0</span>
        ) : (
          <span className="text-gray-600">{itemCount}</span>
        )}
      </span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-blue-400 hover:bg-gray-300"
        }`}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}


// "use client"
// import { use, useState } from "react";
// import { Product } from "../../sanity.types";
// import useBasketStore from "../../store/store";

// interface AddToBasketButtonProps{
//     product: Product,
//     disabled?:Boolean,

// }



// export default function AddToBasketButton({product ,disabled}:AddToBasketButtonProps){
//         const {addItem, removeItem , getItemCount} = useBasketStore()
//         const itemCount= getItemCount(product._id)
//         const [isClient, setIsClient] = useState(false)
    
    


//     return(
//             <div></div>
//         )
// }