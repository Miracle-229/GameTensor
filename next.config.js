/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const fs = require('fs');
const dotenv = require('dotenv');

const env = dotenv.parse(fs.readFileSync('.env.local'));
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.rawg.io', 'lh3.googleusercontent.com'],
  },
  env,
};

module.exports = nextConfig;
