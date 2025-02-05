import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Features from "@/components/second";
import HeroSection from "@/components/hero";




export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  
  return (
    <main>
 
      <HeroSection />
      <div className="flex flex-col items-center justify-top  min-h-screen bg-gray-100 p-4">

        <ProductsView products={products} categories={categories} />
      </div>
      <Features />
    </main>
    
  );
}

