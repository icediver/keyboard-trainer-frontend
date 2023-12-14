/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
  },
  images: {
    domains: [
      "loremflickr.com",
      "www.aptronixindia.com",
      "localhost",
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "i.pravatar.cc",
      "m.media-amazon.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4200/uploads/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
