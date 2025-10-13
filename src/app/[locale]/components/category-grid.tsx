import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { categories } from '../lib/data';
// import { Card, CardContent } from "@/components/ui/card"
// import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.name.toLowerCase()}`}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {category.productCount} items
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
