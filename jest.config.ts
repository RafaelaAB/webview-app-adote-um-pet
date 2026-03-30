import type { Config } from 'jest'
import nextJest from 'next/jest.js'

// next/jest configura automaticamente:
// - transformação de TypeScript via SWC
// - mapeamento de CSS Modules
// - alias @/* para src/*
// - variáveis de ambiente do Next.js
const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/globals.css',
    '!src/app/layout.tsx',  // server component — não testável com jsdom
    '!src/types/index.ts',  // apenas definições de tipos TypeScript, sem código executável
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}

export default createJestConfig(config)
