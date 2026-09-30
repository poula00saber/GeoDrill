/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/construction",
        destination: "https://www.geodrillksa.com/contracting/en",
        permanent: true,
      },
      {
        source: "/contracting",
        destination: "https://www.geodrillksa.com/contracting/en",
        permanent: true,
      },
      {
        source: "/g",
        destination: "https://www.geodrillksa.com/geotechnical/en",
        permanent: true,
      },
      {
        source: "/geotechnical",
        destination: "https://www.geodrillksa.com/geotechnical/en",
        permanent: true,
      },
      {
        source: "/en",
        destination: "https://www.geodrillksa.com/contracting/en",
        permanent: true,
      },
      {
        source: "/ar",
        destination: "https://www.geodrillksa.com/contracting/ar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
