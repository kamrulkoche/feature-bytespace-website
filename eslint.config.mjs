import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/figma/**',
      'scripts/figma*.json',
      'scripts/home-asset-map.json',
      'scripts/figma-image-map.json',
      'scripts/figma-node.json',
      'scripts/figma-home-full.json',
      'scripts/figma-register.json',
      'public/images/auth/register-ref.png',
      'public/images/auth/raw-*.png',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended'
  ),
  {
    rules: {
      semi: ['error', 'always'],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      'no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
