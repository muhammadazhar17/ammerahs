'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {Button} from "@/components/ui/button"; // Corrected import path
import Link from "next/link";
import useBasketStore from "../../../../store/store";

export default function Success() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50"> {/* Updated styling */}
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4"> {/* Added container */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Your order number is: <strong>{orderNumber}</strong>. We&apos;ve
          received your payment and will process your order soon.
        </p>

        <div className="flex space-x-4">
          <Link href="/" passHref > {/* Added legacyBehavior */}
            <Button className="bg-blue-500 text-white">Back to Home</Button>
          </Link>
          <Link href="/orders"> {/* Added legacyBehavior */}
            <Button className="bg-gray-500 text-white">View Orders</Button>
          </Link>
        </div>
      </div> {/* Close the container div */}
    </div>
  );
}