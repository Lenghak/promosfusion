/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/campaigns',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
