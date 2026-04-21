import { getCollection } from 'astro:content';
import { getPostSlug, getSortedPosts } from '../lib/blog';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const site = 'https://www.hiharmonyos.com';
  const posts = getSortedPosts(await getCollection('posts', ({ data }) => !data.draft));

  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${getPostSlug(post)}/`, site).toString();

      return `<item>
  <title>${escapeXml(post.data.title)}</title>
  <link>${link}</link>
  <guid>${link}</guid>
  <description>${escapeXml(post.data.description)}</description>
  <pubDate>${post.data.date.toUTCString()}</pubDate>
</item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>HiHarmonyOS</title>
  <link>${site}</link>
  <description>鸿蒙技术博客，聚焦 HarmonyOS、ArkTS、性能优化与工程实践。</description>
  <language>zh-cn</language>
  ${items}
</channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
