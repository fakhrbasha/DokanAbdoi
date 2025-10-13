import Image from 'next/image';
import { Navbar } from './components/navbar';
import HeroGrid from './components/grids';
import { Footer } from './components/footer';
import { Link } from '@/i18n/routing';
import GridSlider from './components/GridSlider';
import ProductSlider from './components/ProductSlider';
// import { SwipeCarousel } from '@/components/SwipeCarousel';
// import SpotlightGrid from '@/components/grids';
// import HeroGrid from '@/components/grids';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="containeres">
          <HeroGrid />
        </div>
        <section className="containeres mx-auto   py-10">
          <div className="grid grid-cols-4 grid-rows-2 gap-4">
            <div className="col-span-2 row-span-2">
              <Image
                src="/hero/sec2.webp"
                alt="صورة 1"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-span-2 row-span-2 col-start-3">
              <Image
                src="/hero/sec2i.webp"
                alt="صورة 2"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <div className="containeres ">
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <div className="row-span-2">
              <Image
                src={'/hero/sec3.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec3i.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec3ii.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec3iii.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="containeres py-6">
          <div className="grid  grid-cols-6 grid-rows-1 gap-2">
            <div className="col-span-6">
              <Image
                src={'/hero/sec4.webp'}
                alt=" "
                className="w-full"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>

        <div className="containeres">
          <div className="grid  grid-cols-6 grid-rows-1 gap-2">
            <div className="col-span-6 flex justify-between px-10 bg-amber-600 text-3xl text-white py-6 ">
              <h2 className="">ألاجهزة الكهربائية الكبيرة</h2>
              <Link className="underline" href={''}>
                شوف اكتر
              </Link>
            </div>
          </div>
        </div>
        <GridSlider />

        <section className="containeres mx-auto  py-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-4">
            <div className="col-span-2 row-span-2">
              <Image
                src="/hero/sec5.webp"
                alt="صورة 1"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-span-2 row-span-2 col-start-3">
              <Image
                src="/hero/sec5ii.webp"
                alt="صورة 2"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="containeres pb-6">
          <div className="grid grid-cols-6 grid-rows-4 gap-4">
            {[
              '/hero/sec6.webp',
              '/hero/sec6ii.webp',
              '/hero/sec6i.webp',
              '/hero/sec6iii.webp',
              '/hero/sec6iiii.webp',
              '/hero/sec6iiiii.webp',
            ].map((src, index) => (
              <div key={index} className="relative col-span-1 row-span-4">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="w-full  h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>

        <ProductSlider />
        <div className="containeres py-6">
          <div className="grid  grid-cols-6 grid-rows-1 gap-2">
            <div className="col-span-6 flex justify-between px-10 bg-amber-600 text-3xl text-white py-6 ">
              <h2 className="">أدوات ومستلزمات المطبخ</h2>
              <Link className="underline" href={''}>
                شوف اكتر
              </Link>
            </div>
          </div>
        </div>
        <GridSlider />

        <div className="containeres ">
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <div className="row-span-2">
              <Image
                src={'/hero/sec7i.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec7ii.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec7iii.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec7iiii.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="containeres py-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <div className="row-span-2">
              <Image
                src={'/hero/sec81.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec82.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec83.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
            <div className="row-span-2">
              {' '}
              <Image
                src={'/hero/sec84.webp'}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
          </div>
        </div>
        <ProductSlider />

        <div className="containeres py-6">
          <div className="grid  grid-cols-6 grid-rows-1 gap-2">
            <div className="col-span-6 flex justify-between px-10 bg-amber-600 text-3xl text-white py-6 ">
              <h2 className="">التلفيزيونات والاكسسوارات</h2>
              <Link className="underline" href={''}>
                شوف اكتر
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
