'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { brands, products } from '../lib/data';
import { Navbar } from '../components/navbar';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { ProductCard } from '../components/product-card';
import { Footer } from '../components/footer';

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const brandProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Shop by Brand</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover products from the world's leading brands
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search brands..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Brands Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Card
                key={brand.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() =>
                  setSelectedBrand(
                    selectedBrand === brand.name ? null : brand.name
                  )
                }
              >
                <CardContent className="p-8 flex flex-col items-center justify-center gap-4 aspect-square">
                  <div className="w-full h-24 flex items-center justify-center">
                    <img
                      src={brand.logo || '/placeholder.svg'}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-xl mb-1">{brand.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {brand.productCount} products
                    </p>
                  </div>
                  {selectedBrand === brand.name && (
                    <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Selected Brand Products */}
        {selectedBrand && (
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">
                {selectedBrand} Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {brandProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
