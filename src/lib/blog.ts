import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'posts'>;

function toSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\\/]/g, '-')
    .replace(/\s+/g, '-');
}

export function getSortedPosts(posts: Post[]) {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getFeaturedPosts(posts: Post[], limit = 3) {
  return getSortedPosts(posts)
    .filter((post) => post.data.featured)
    .slice(0, limit);
}

export function getAllTags(posts: Post[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
}

export function getAllCategories(posts: Post[]) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) => a.localeCompare(b));
}

export function getPostSlug(post: Post) {
  return post.id.replace(/\.md$/, '');
}

export function getCategorySlug(category: string) {
  return toSegment(category);
}

export function getTagSlug(tag: string) {
  return toSegment(tag);
}

export function getCategoryUrl(category: string) {
  return `/blog/category/${getCategorySlug(category)}/`;
}

export function getTagUrl(tag: string) {
  return `/blog/tag/${getTagSlug(tag)}/`;
}

export function findCategoryBySlug(posts: Post[], slug: string) {
  return getAllCategories(posts).find((category) => getCategorySlug(category) === slug);
}

export function findTagBySlug(posts: Post[], slug: string) {
  return getAllTags(posts).find((tag) => getTagSlug(tag) === slug);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
