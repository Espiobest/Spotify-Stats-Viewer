import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REDIRECT_URI: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

export default nextConfig
