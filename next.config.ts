import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Informa ao Next.js qual é a raiz real do projeto.
  // Necessário quando há múltiplos package-lock.json no sistema de arquivos
  // (ex: um em C:\Users\Rafaela Andrade e outro aqui em adote-um-pet).
  // Sem isso, o Next.js infere a raiz errada e exibe um warning no build/dev.
  outputFileTracingRoot: path.join(__dirname),
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
