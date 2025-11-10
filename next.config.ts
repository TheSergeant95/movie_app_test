/** @type {import('next').NextConfig} */

const nextConfig = {
    typedRoutes: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/movies',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
