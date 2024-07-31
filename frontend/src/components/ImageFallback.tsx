import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageFallback({
    src,
    fallbackSrc,
    ...rest
}: {
    src: string;
    fallbackSrc: string;
    [key: string]: any;
}) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isImageBroken, setIsImageBroken] = useState(false);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <div className="relative">
            {isImageBroken && (
                <div className="absolute bg-background w-full h-full opacity-50 bg-gradient-to-tr from-background via-background to-transparent">
                    <span className="text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">Image not found</span>
                </div>
            )}
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
                        setIsImageBroken(true);
                    }
                }}
                onError={() => {
                    setImgSrc(fallbackSrc);
                    setIsImageBroken(true);
                }}
            />
        </div>
    );
}
