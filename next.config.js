const withPWA = require("next-pwa");
const objectStorage =
  process.env.NEXT_PUBLIC_OBJECT_STORAGE_URL.match(/[^:\/]+(:[0-9]+)?/gm)[1] || "";

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  images: {
    domains: ["github.com", objectStorage],
  },
});
