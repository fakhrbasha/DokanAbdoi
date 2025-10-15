import { Suspense } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import ProductsClient from '../components/products-client/products-client';

export default async function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 containeres mx-auto px-4 ">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsClient />
        </Suspense>
      </main>
    </div>
  );
}
