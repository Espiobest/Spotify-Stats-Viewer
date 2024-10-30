import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    SPOTIFY_CLIENT_ID : process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URI : process.env.SPOTIFY_REDIRECT_URI
  }
};

export default nextConfig;
