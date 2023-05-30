/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      '192.168.100.38',
      'storage.googleapis.com',
    ],
    env: {
      NEXT_PUBLIC_GITHUB_CLIENTE: '732322a85754ba875f97',
      NEXT_PUBLIC_BASE_URL: 'https://server-psi-ten.vercel.app',
    },
  },
}

module.exports = nextConfig
