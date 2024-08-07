/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "43.218.241.82"],
    },
    // webpack: (config, context) => {
    //     config.watchOptions = {
    //         poll: 1000,
    //         aggregateTimeout: 300,
    //     };
    //     return config;
    // },
};

export default nextConfig;
