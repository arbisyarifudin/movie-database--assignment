import React, { useEffect, useState } from 'react';

const Wave = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile ? (
        <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '110px' }}
        >
            <path
                fill="#20DF7F"
                fillOpacity="0.09"
                d="M0,160L60,176C120,192,240,224,360,234.7C480,245,600,235,720,218.7C840,203,960,181,1080,176C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
            <path
                fill="#E5E5E5"
                fillOpacity="0.13"
                d="M0,288L60,282.7C120,277,240,267,360,234.7C480,203,600,149,720,133.3C840,117,960,139,1080,165.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 111"
            fill="none"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '111px' }}
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 44.4L48 53.28C96 62.16 192 79.92 288 75.48C384 71.04 480 44.4 576 26.64C672 8.88 768 0 864 0C960 0 1056 8.88 1152 24.42C1248 39.96 1344 62.16 1392 73.26L1440 84.36V111H1392C1344 111 1248 111 1152 111C1056 111 960 111 864 111C768 111 672 111 576 111C480 111 384 111 288 111C192 111 96 111 48 111H0V44.4Z"
                fill="#E5E5E5"
                fill-opacity="0.13"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0L59.625 4.17052C120.375 8.34104 239.625 16.6821 360 30.7977C480.375 45.2341 599.625 65.7659 720 69.9364C840.375 74.1069 959.625 61.5954 1080 57.7457C1200.38 53.5751 1319.62 57.7457 1380.38 59.6705L1440 61.5954V111H1380.38C1319.62 111 1200.38 111 1080 111C959.625 111 840.375 111 720 111C599.625 111 480.375 111 360 111C239.625 111 120.375 111 59.625 111H0V0Z"
                fill="#20DF7F"
                fill-opacity="0.09"
            />
        </svg>
    );
};

export default Wave;
