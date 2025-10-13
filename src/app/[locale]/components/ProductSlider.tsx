'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'ثلاجة نوفروست ميديا 411 لتر فضي + مع مقلاة',
    model: 'MDRT580MTN46',
    price: 25999,
    oldPrice: 29999,
    image: '/Hero/sale.webp',
  },
  {
    id: 2,
    name: 'ديب فريزر ديجيتال نوفروست يونيون اير 230 لتر، 6 درج، باب زجاج',
    model: 'UFN-230EBG1A',
    price: 19950,
    oldPrice: 26000,
    image: '/Hero/sale2.webp',
  },
  {
    id: 3,
    name: 'غسالة هاف اتوماتيك ياساب، 10 كجم، 2 حوض - أبيض أزرق',
    model: 'WMH10AP',
    price: 5299,
    oldPrice: 5510,
    image: '/Hero/sec2.webp',
  },
  {
    id: 4,
    name: 'غسالة ملابس نصف اوتوماتيك ياساب، 10 كيلو، حوضين',
    model: 'WMH10B',
    price: 5249,
    oldPrice: 5699,
    image: '/Hero/sec2i.webp',
  },
  {
    id: 5,
    name: 'سخان مياه غاز طبيعي اريستون، 6 لتر، أبيض',
    model: 'DGI 6L DF NG',
    price: 3897,
    oldPrice: 4053,
    image: '/Hero/sec6.webp',
  },
  {
    id: 6,
    name: 'سخان مياه غاز طبيعي اريستون، 6 لتر، أبيض',
    model: 'DGI 6L DF NG',
    price: 3897,
    oldPrice: 4053,
    image: '/Hero/sec6i.webp',
  },
  {
    id: 7,
    name: 'سخان مياه غاز طبيعي اريستون، 6 لتر، أبيض',
    model: 'DGI 6L DF NG',
    price: 3897,
    oldPrice: 4053,
    image: '/Hero/sec6ii.webp',
  },
];

export default function ProductSlider() {
  const [current, setCurrent] = useState(0);
  const visible = 6;

  const next = () => {
    if (current < products.length - visible) setCurrent((prev) => prev + 1);
  };
  const prev = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  return (
    <section className="relative containeres mx-auto py-8 ">
      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400/70 hover:bg-gray-600 text-white p-3 rounded-md disabled:opacity-40"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{
            transform: `translateX(-${current * (100 / visible)}%)`,
            width: `${(products.length / visible) * 100}%`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border p-3 flex-shrink-0"
              style={{ width: `${100 / visible}%` }}
            >
              <div className="relative w-full h-64 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-700 leading-snug line-clamp-2">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{product.model}</p>
                <div className="mt-2">
                  <p className="text-lg font-bold text-black">
                    {product.price.toLocaleString()}{' '}
                    <span className="text-sm">جنيه</span>
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {product.oldPrice.toLocaleString()} جنيه
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        disabled={current >= products.length - visible}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400/70 hover:bg-gray-600 text-white p-3 rounded-md disabled:opacity-40"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
