export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: 'https://abhisheka-technologies.vercel.app/sitemap.xml',
  };
}
