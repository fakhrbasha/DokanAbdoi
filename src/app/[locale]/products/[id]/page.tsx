'use client';

import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { products } from '../../lib/data';
import { useCartStore, useWishlistStore } from '../../lib/store';
import { useToast } from '../../hooks/use-toast';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { Button } from '../../components/ui/button';
import { ProductCard } from '../../components/product-card';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to wishlist',
        description: `${product.name} added to your wishlist.`,
      });
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex  flex-col">
      <main className="flex-1">
        {/* Product Details */}
        <div className="containeres mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-sm text-primary font-semibold mb-2">
                  {product.brand}
                </p>
                <h1 className="text-4xl font-bold mb-4 text-balance">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-2xl text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                        Save{' '}
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                {product.inStock ? (
                  <p className="text-green-600 font-semibold mb-6">In Stock</p>
                ) : (
                  <p className="text-destructive font-semibold mb-6">
                    Out of Stock
                  </p>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4"
                    >
                      -
                    </Button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist ? 'fill-primary text-primary' : ''
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-sm text-muted-foreground">
                      100% secure transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
