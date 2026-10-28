/** Markdown twin of every key page, e.g. /services/seo.md, /index.md. Linked from llms.txt and <link rel="alternate">. */
import type { APIRoute } from 'astro';
import { allLlmPages, renderPageMarkdown } from '@/lib/llms';

export async function getStaticPaths() {
  const pages = await allLlmPages();
  return pages.map((p) => ({ params: { path: p.mdPath.replace(/^\//, '').replace(/\.md$/, '') }, props: { page: p } }));
}
export const GET: APIRoute = async ({ props }) => new Response(renderPageMarkdown(props.page), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
