'use client';

import Image from 'next/image';
import { SwipeCarousel } from './SwipeCarousel';
import ProductSlider from './ProductSlider';
import GridSlider from './GridSlider';

export default function HeroGrid() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="mb-2  overflow-hidden">
          <Image
            src="/Hero/Banner1.png"
            width={1000}
            height={500}
            alt="بنك مصر"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
          <div className="flex flex-col gap-1">
            <div className="bg-[#f5f5f5]   overflow-hidden">
              <Image
                src="/Hero/sale2.jpg"
                width={500}
                height={300}
                alt="خصم الأثاث"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-[#f5f5f5] overflow-hidden">
              <Image
                src="/Hero/sale1.jpg"
                width={500}
                height={300}
                alt="عروض التوفير"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <Image
              src="/Hero/main.jpg"
              width={500}
              height={340}
              alt="خصم الأثاث"
              className="w-full h-[413px]  object-cover"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-center">
          {[
            { title: 'مراوح', img: '/Hero/icon/1.jpg' },
            { title: 'لاب توب', img: '/Hero/icon/2.jpg' },
            { title: 'أجهزة للارتداء', img: '/Hero/icon/3.jpg' },
            { title: 'أمن ومراقبة', img: '/Hero/icon/4.jpg' },
            { title: 'السجاد', img: '/Hero/icon/5.jpg' },
            { title: 'الشنط', img: '/Hero/icon/6.jpg' },
            { title: 'العناية الشخصية', img: '/Hero/icon/7.jpg' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-28 h-28  flex items-center justify-center   hover:scale-105 transition-transform">
                <Image
                  src={item.img}
                  width={100}
                  height={100}
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
