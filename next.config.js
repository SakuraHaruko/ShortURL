/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['data.nekocafe.moe'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "data.nekocafe.moe",
                pathname: "/qwq.lgbt"
            }
        ]
    },
}

module.exports = nextConfig
