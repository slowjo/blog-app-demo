import Image from 'next/image';
import { useState } from 'react'


type ArticleImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export default function ArticleImage({ src, alt, width, height } : ArticleImageProps) {
    const [loading, setLoading] = useState(true)

    return (
        <Image
            className={`${loading ? 'animate-pulse bg-gray-200 blur-md' : ''} fade-in`}
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setLoading(false)}
        />
    )
}