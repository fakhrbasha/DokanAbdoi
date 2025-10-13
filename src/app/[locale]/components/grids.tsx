'use client';

import Image from 'next/image';
import { SwipeCarousel } from './SwipeCarousel';

export default function HeroGrid() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="mb-2 rounded-lg overflow-hidden">
          <Image
            src="/hero/1bank.webp"
            width={1000}
            height={500}
            alt="بنك مصر"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
          <div className="flex flex-col gap-1">
            <div className="bg-[#f5f5f5] rounded-lg overflow-hidden">
              <Image
                src="/hero/sale.webp"
                width={500}
                height={300}
                alt="خصم الأثاث"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-[#f5f5f5] rounded-lg overflow-hidden">
              <Image
                src="/hero/sale2.webp"
                width={500}
                height={300}
                alt="عروض التوفير"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <SwipeCarousel />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-center">
          {[
            { title: 'مراوح', img: '/icons/fan.png' },
            { title: 'لاب توب', img: '/icons/laptop.png' },
            { title: 'أجهزة للارتداء', img: '/icons/watch.png' },
            { title: 'أمن ومراقبة', img: '/icons/camera.png' },
            { title: 'السجاد', img: '/icons/rug.png' },
            { title: 'الشنط', img: '/icons/bag.png' },
            { title: 'العناية الشخصية', img: '/icons/care.png' },
            { title: 'خصومات حصرية', img: '/icons/discount.png' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                <Image
                  src={item.img}
                  width={40}
                  height={40}
                  alt={item.title}
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
