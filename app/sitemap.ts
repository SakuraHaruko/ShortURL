import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://qwq.lgbt',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ]
}