'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const imgs = [
  '/airpods-pro-lifestyle.png',
  '/fashion-accessories-collection.png',
  '/fashion-clothes.jpg',
  '/luxury-watches-clocks.jpg',
  '/modern-electronics-store.png',
  '/samsung-logo.png',
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: 'spring' as const,
  stiffness: 250,
  damping: 30,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragX = useMotionValue(0);
  const autoRef = useRef<number | null>(null);

  // ✅ animate dragX whenever index changes
  useEffect(() => {
    const width = containerRef.current?.offsetWidth ?? 0;

    // ✅ Correct Framer Motion 11 syntax (target directly as second arg)
    const controls = animate(dragX, -imgIndex * width, {
      type: 'spring',
      stiffness: 250,
      damping: 30,
    });

    return () => controls.stop();
  }, [imgIndex, dragX]);

  // ✅ auto-play
  useEffect(() => {
    autoRef.current = window.setInterval(() => {
      setImgIndex((pv) => (pv === imgs.length - 1 ? 0 : pv + 1));
    }, AUTO_DELAY);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, []);

  // ✅ drag logic
  const onDragEnd = () => {
    const x = dragX.get();
    const width = containerRef.current?.offsetWidth ?? 1;
    let target = imgIndex;

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      target = imgIndex + 1;
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      target = imgIndex - 1;
    }

    setImgIndex(target);
  };

  const nextSlide = () =>
    setImgIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setImgIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-neutral-900 rounded-xl h-full w-full"
      style={{ touchAction: 'pan-y' }}
    >
      <motion.div
        drag="x"
        dragElastic={0.15}
        dragMomentum={false}
        style={{ x: dragX }}
        onDragEnd={onDragEnd}
        className="flex h-full"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <ArrowButton direction="left" onClick={prevSlide} />
      <ArrowButton direction="right" onClick={nextSlide} />

      <GradientEdges />
    </div>
  );
};

const Images = ({ imgIndex }: { imgIndex: number }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          animate={{
            scale: imgIndex === idx ? 1 : 0.97,
          }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 30,
          }}
          className="flex-shrink-0 w-full h-full rounded-xl bg-neutral-800"
        />
      ))}
    </>
  );
};

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  const positionClass =
    direction === 'left' ? 'left-3 justify-start' : 'right-3 justify-end';

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${positionClass} flex items-center text-white/80 hover:text-white transition z-20`}
    >
      <div className="bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-sm">
        <Icon size={28} />
      </div>
    </button>
  );
};

const GradientEdges = () => {
  return (
    <>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-[8vw] max-w-[90px] bg-gradient-to-r from-neutral-900/60 to-neutral-900/0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[8vw] max-w-[90px] bg-gradient-to-l from-neutral-900/60 to-neutral-900/0" /> */}
    </>
  );
};
