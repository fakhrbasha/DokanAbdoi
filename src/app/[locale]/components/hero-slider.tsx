'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const slides = [
  {
    id: 1,
    title: 'Latest Electronics',
    subtitle: 'Up to 50% Off',
    description: 'Shop the newest tech from LG, Dell, Samsung and more',
    image: '/electronics-gadgets.png',
    cta: 'Shop Electronics',
    link: '/products?category=electronics',
  },
  {
    id: 2,
    title: 'Fashion Forward',
    subtitle: 'New Arrivals',
    description: 'Discover the latest trends in clothing and accessories',
    image: '/fashion-clothes.jpg',
    cta: 'Shop Fashion',
    link: '/products?category=clothes',
  },
  {
    id: 3,
    title: 'Premium Footwear',
    subtitle: 'Nike & Adidas',
    description: 'Step up your style with top brand sneakers',
    image: '/sneakers-shoes.jpg',
    cta: 'Shop Shoes',
    link: '/products?category=shoes',
  },
  {
    id: 4,
    title: 'Luxury Watches',
    subtitle: 'Timeless Elegance',
    description: 'Find the perfect timepiece for every occasion',
    image: '/luxury-watches.jpg',
    cta: 'Shop Watches',
    link: '/products?category=watches',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent z-10" />
          <img
            src={slide.image || '/placeholder.svg'}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <p className="text-primary font-semibold text-lg mb-2">
                  {slide.subtitle}
                </p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">
                  {slide.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {slide.description}
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="gap-2">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-background/80 backdrop-blur"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-background/80 backdrop-blur"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-background/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
