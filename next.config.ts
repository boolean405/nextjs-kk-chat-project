import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Google Images (googleusercontent.com)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
        search: "",
      },
      // GitHub Images (githubusercontent.com)
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**", // GitHub images can be found under this path
        search: "",
      },
      // Facebook Images (fbcdn.net)
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net", // Facebook CDN for images
        port: "",
        pathname: "/v/t1.0-9/**", // This path is a common pattern for Facebook image URLs
        search: "",
      },
       // Cloudinary Images (res.cloudinary.com)
       {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Matches all Cloudinary image paths
        search: '',
      },
    ],
  },

  experimental: {
    // swcPlugins: [["next-superjson-plugin", {}]],
  },
};

export default nextConfig;
