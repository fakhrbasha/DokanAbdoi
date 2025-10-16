import Image from 'next/image';
import { Link } from '@/i18n/routing';
import HeroGrid from './components/grids';
import GridSlider from './components/GridSlider';
import ProductSlider from './components/ProductSlider';

interface SectionHeaderProps {
  title: string;
  link: string;
}

const SectionHeader = ({ title, link }: SectionHeaderProps) => (
  <div className="containeres py-6">
    <div className="grid grid-cols-6">
      <div className="col-span-6 flex justify-between px-10 bg-amber-600 text-3xl text-white py-6">
        <h2>{title}</h2>
        <Link className="underline" href={link}>
          شوف اكتر
        </Link>
      </div>
    </div>
  </div>
);

interface ImageGridProps {
  images: string[];
  cols?: number;
  fullDisplay?: boolean;
  links?: string[];
}

const ImageGrid = ({
  images,
  cols = 4,
  fullDisplay = false,
  links = [],
}: ImageGridProps) => {
  const colClass =
    cols === 2
      ? 'grid-cols-2'
      : cols === 3
      ? 'grid-cols-3'
      : cols === 4
      ? 'grid-cols-4'
      : cols === 5
      ? 'grid-cols-5'
      : cols === 6
      ? 'grid-cols-6'
      : 'grid-cols-4';

  return (
    <div className="containeres py-6">
      <div className={`grid ${colClass} gap-4`}>
        {images.map((src, i) => {
          const href = links[i] || '#';
          return (
            <Link key={i} href={href}>
              <div className="relative w-full cursor-pointer group">
                <Image
                  src={src}
                  alt={`Image ${i + 1}`}
                  width={1000}
                  height={1000}
                  className={`w-full rounded-lg transition-transform duration-300  ${
                    fullDisplay ? 'h-auto object-contain' : 'h-64 object-cover'
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="containeres">
          <HeroGrid />
        </div>

        {/* Dual Image Section */}
        <ImageGrid
          images={['/Hero/sec2i.png', '/Hero/seci2i.png']}
          links={['/category/appliances', '/category/fashion']}
          cols={2}
          fullDisplay={true}
        />

        {/* Four Image Section */}
        <ImageGrid
          images={[
            '/Hero/sec4i.jpg',
            '/Hero/sec4ii.jpg',
            '/Hero/sec4iii.jpg',
            '/Hero/sec4iiii.jpg',
          ]}
          links={[
            '/category/tvs',
            '/category/mobiles',
            '/category/furniture',
            '/category/kitchen',
          ]}
          cols={4}
        />

        {/* Full Width Banner */}
        <div className="containeres py-6">
          <Image
            src="/Hero/payments.jpg"
            alt="Banner"
            className="w-full rounded-lg"
            width={1000}
            height={1000}
          />
        </div>

        {/* Section: Large Appliances */}
        <SectionHeader
          title="ألاجهزة الكهربائية الكبيرة"
          link="/category/appliances"
        />
        <GridSlider />

        {/* Two-Image Split Section */}
        <ImageGrid
          images={['/Hero/sec5.webp', '/Hero/sec5ii.webp']}
          links={['/category/washers', '/category/refrigerators']}
          cols={2}
          fullDisplay={true}
        />

        {/* Multi-Image Grid */}
        <ImageGrid
          images={[
            '/Hero/sec6.webp',
            '/Hero/sec6ii.webp',
            '/Hero/sec6i.webp',
            '/Hero/sec6iii.webp',
            '/Hero/sec6iiii.webp',
            '/Hero/sec6iiiii.webp',
          ]}
          links={[
            '/category/kitchen',
            '/category/fans',
            '/category/irons',
            '/category/lights',
            '/category/tools',
            '/category/cleaning',
          ]}
          cols={6}
          fullDisplay={true}
        />

        <ProductSlider />

        {/* Section: Kitchen Tools */}
        <SectionHeader
          title="أدوات ومستلزمات المطبخ"
          link="/category/kitchen"
        />
        <GridSlider />

        {/* Two Image Rows */}
        <ImageGrid
          images={[
            '/Hero/sec7i.webp',
            '/Hero/sec7ii.webp',
            '/Hero/sec7iii.webp',
            '/Hero/sec7iiii.webp',
          ]}
          links={[
            '/category/mixers',
            '/category/microwave',
            '/category/blenders',
            '/category/cookers',
          ]}
          cols={4}
          fullDisplay={true}
        />

        <ImageGrid
          images={[
            '/Hero/sec81.webp',
            '/Hero/sec82.webp',
            '/Hero/sec83.webp',
            '/Hero/sec84.webp',
          ]}
          links={[
            '/category/furniture',
            '/category/home-accessories',
            '/category/lighting',
            '/category/decor',
          ]}
          cols={4}
          fullDisplay={true}
        />

        <ProductSlider />

        {/* Section: TVs */}
        <SectionHeader title="التلفيزيونات والاكسسوارات" link="/category/tvs" />
        <ImageGrid
          images={[
            '/Hero/sec9Banner.webp',
            '/Hero/sec9Banner2.webp',
            '/Hero/sec9Banneriii.webp',
            '/Hero/sec9iiii.webp',
          ]}
          links={[
            '/category/tvs',
            '/category/speakers',
            '/category/remotes',
            '/category/stands',
          ]}
          cols={4}
          fullDisplay={true}
        />
        <ProductSlider />
        <GridSlider />
        <SectionHeader title="أجهزة المنزل والمطبح" link="/category/home" />

        <ImageGrid
          images={['/Hero/sec101.webp', '/Hero/sec102.webp']}
          links={['/category/home', '/category/kitchen']}
          cols={2}
          fullDisplay={true}
        />
        <ImageGrid
          images={[
            '/Hero/sec103.webp',
            '/Hero/sec104.webp',
            '/Hero/sec105.webp',
            '/Hero/sec106.webp',
            '/Hero/sec107.webp',
            '/Hero/sec108.webp',
          ]}
          links={[
            '/category/bathroom',
            '/category/laundry',
            '/category/furniture',
            '/category/storage',
            '/category/cleaning',
            '/category/accessories',
          ]}
          cols={6}
          fullDisplay={true}
        />
        <ProductSlider />
      </main>
    </div>
  );
}
