'use client'
import { useState } from 'react'
import Image from 'next/image'


type CardImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    cardType: 'horizontal' | 'vertical';
    // base64: string;
}

export default function Home({ src, alt, width, height, cardType } : CardImageProps) {
// export default function Home({ src, alt, width, height, cardType, base64 } : CardImageProps) {
  const [loading, setLoading] = useState(true)
  return (
    <>
        {cardType === 'horizontal' ? (
            <div className="relative">
            <Image
                className={`${loading ? 'animate-pulse bg-gray-200 blur-md' : ''} rounded-lg object-cover md:absolute inset-0 max-h-56 md:max-h-none min-w-full min-h-full w-full h-48 md:w-auto md:h-auto hover:scale-110 transition-transform duration-1000`}
                // fill={true} 
                // placeholder="blur" 
                // blurDataURL={base64}
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
                // fill={true} 
                // placeholder="blur" 
                // blurDataURL={base64}
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