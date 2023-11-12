/** @type {import('next').NextConfig} */
export default {
    // ...other configuration
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
};