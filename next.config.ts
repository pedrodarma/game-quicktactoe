import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true, // Github Pages needs this
	basePath: '',
	assetPrefix: '',
	allowedDevOrigins: isProd ? [] : ['localhost', '192.168.15.13'],
	distDir: isProd ? 'build' : 'out',
	eslint: {
		dirs: ['components', 'app', 'src'],
	},
};

export default nextConfig;
