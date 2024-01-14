import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: ['/','/*/'],
                allow: ['/'],
            },
        ],
        sitemap: 'https://qwq.lgbt/sitemap.xml',
    };
}
