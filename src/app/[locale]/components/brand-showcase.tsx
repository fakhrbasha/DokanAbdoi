import Link from 'next/link';
import { brands } from '../lib/data';
import { Card, CardContent } from './ui/card';

export function BrandShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/products?brand=${brand.name}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center justify-center gap-4 aspect-square">
              <div className="w-full h-20 flex items-center justify-center">
                <img
                  src={brand.logo || '/placeholder.svg'}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">{brand.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {brand.productCount} products
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
