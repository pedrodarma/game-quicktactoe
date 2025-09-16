import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
	output: 'export', // Gera site 100% estático
	trailingSlash: true, // Para compatibilidade com GitHub Pages
	// images: {
	// 	unoptimized: true, // Desabilita a otimização de imagens do Next.js
	// },
	basePath: '',
	assetPrefix: '',
	allowedDevOrigins: isProd ? [] : ['localhost', '192.168.15.9'],
	// basePath: isProd ? '/robot-broker' : '',
	// assetPrefix: isProd ? '/robot-broker/' : '',
	distDir: isProd ? 'build' : 'out',
};

export default nextConfig;
