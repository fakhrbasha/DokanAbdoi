'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeleton from '@mui/material/Skeleton';

interface BlurImageProps extends Omit<ImageProps, 'onLoad'> {
  src: string;
  alt: string;
  static?: boolean;
}

export default function BlurImage({ src, alt, static: staticProp, ...props }: BlurImageProps): React.JSX.Element {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading &&
        (props.fill || props.layout === 'fill' ? (
          <Skeleton
            width={'100%'}
            height={'100%'}
            variant="rectangular"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        ) : (
          <Skeleton
            width={props.width}
            height={props.height}
            variant="rectangular"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        ))}
      <Image
        src={src}
        alt={alt}
        onLoad={() => {
          setLoading(false);
        }}
        sizes={isDesktop ? '14vw' : '50vw'}
        {...props}
      />
    </>
  );
}

