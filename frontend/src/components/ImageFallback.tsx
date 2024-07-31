import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageFallback({ src, fallbackSrc, ...rest }: { src: string, fallbackSrc: string, [key: string]: any }) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            key={imgSrc}
            alt={rest.alt || 'Poster Image'}
            src={imgSrc}
            onLoad={(result) => {
                const imageElement = result.target as HTMLImageElement;
                if (imageElement.naturalWidth === 0) {
                    // Broken image
                    setImgSrc(fallbackSrc);
                }
            }}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}
