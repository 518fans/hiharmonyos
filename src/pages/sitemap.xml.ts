import { getCollection } from 'astro:content';
import {
  getAllCategories,
  getAllTags,
  getArchiveUrl,
  getBlogUrl,
  getCategoriesPageUrl,
  getCategoryUrl,
  getPostUrl,
  getTagsPageUrl,
  getTagUrl,
} from '../lib/blog';

export async function GET() {
  const site = 'https://www.hiharmonyos.com';
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const categories = getAllCategories(posts);
  const tags = getAllTags(posts);
  const urls = [
    '/',
    getBlogUrl(),
    getArchiveUrl(),
    getCategoriesPageUrl(),
    getTagsPageUrl(),
    '/about.html',
    '/rss.xml',
    ...categories.map((category) => getCategoryUrl(category)),
    ...tags.map((tag) => getTagUrl(tag)),
    ...posts.map((post) => getPostUrl(post)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${new URL(url, site).toString()}</loc></url>`)
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
