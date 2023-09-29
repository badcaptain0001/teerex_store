/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['geektrust.s3.ap-southeast-1.amazonaws.com'],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/productlisting',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig
