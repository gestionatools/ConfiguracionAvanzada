/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable client-side Router Cache for dynamic pages so router.refresh()
    // always fetches fresh RSC data from the server (default is 30s)
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
}

export default nextConfig
