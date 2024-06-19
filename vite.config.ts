/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        // watch: false,
        // reporters: ['html'],
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup',
        css: true,
        coverage: {
            // clean: true,
            // enabled: true,
            reporters: ['html'],
            threshold: {
                lines: 80,
                statements: 80,
                branches: 80,
                functions: 80,
                perFile: true,
                ignoreEmptyLines: true,
            },
            // includes: ['src/pages/**/*.test.ts'],
            exclude: [
                'src/pages/**/index.ts',
                'src/hooks/**',
                'src/routes/**',
                'src/types/**',
                'src/utils/**',
                'src/components/**',
                '.eslintrc.cjs',
                'src/App.tsx',
                'src/main.tsx',
                'src/AuthApp.tsx',
                'src/axiosInstance.ts',
                'html/assets/**',
                'src/mocks/**',
            ],
        },
    },
    resolve: {
        alias: {
            // @/folder => src/folder
            '@': path.resolve(__dirname, '/src'),
        },
    },
});
