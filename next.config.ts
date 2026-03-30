import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // loremflickr.com — imagens reais de pets buscadas do Flickr
        // o parâmetro ?lock=N garante sempre a mesma imagem para o mesmo número
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
}

export default nextConfig
