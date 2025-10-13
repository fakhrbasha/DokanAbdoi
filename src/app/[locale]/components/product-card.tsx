'use client';

import type React from 'react';

import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../lib/types';
import { useCartStore, useWishlistStore } from '../lib/store';
import { useToast } from './ui/use-toast';
import { Card, CardContent, CardFooter } from './ui/card';
import { Link } from '@/i18n/routing';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {product.originalPrice && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </div>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3 h-9 w-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist ? 'fill-primary text-primary' : ''
                }`}
              />
            </Button>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start p-4 gap-3">
        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-sm mb-2 hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        <Button className="w-full gap-2" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
