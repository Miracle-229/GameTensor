/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['media.rawg.io', 'lh3.googleusercontent.com'],
  },
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    LOCAL_URL: process.env.LOCAL_URL,
    WS_URL: process.env.WS_URL,
  },
};

module.exports = nextConfig;
