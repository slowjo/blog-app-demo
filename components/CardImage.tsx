'use client'
import { useState } from 'react'
import Image from 'next/image'


type CardImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    cardType: 'horizontal' | 'vertical';
}

export default function Home({ src, alt, width, height, cardType } : CardImageProps) {
  const [loading, setLoading] = useState(true)
  return (
    <>
        {cardType === 'horizontal' ? (
            <div className="relative">
            <Image
                className={`${loading ? 'animate-pulse bg-gray-200 blur-md' : ''} rounded-lg object-cover md:absolute inset-0 max-h-56 md:max-h-none min-w-full min-h-full w-full h-48 md:w-auto md:h-auto hover:scale-110 transition-transform duration-1000`}
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={() => setLoading(false)}
            />
            </div>
        ) : (
            <div className="relative">
            <Image
                priority
                className={`${loading ? 'animate-pulse bg-gray-200 blur-md' : ''} rounded-lg md:absolute inset-0 md:min-h-full min-w-full hover:scale-105 transition-transform duration-1000 object-cover max-h-56 md:max-h-none w-full h-56 md:w-auto md:h-auto`}
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={() => setLoading(false)}
            />
            </div>
        )}
    </>
  )
}