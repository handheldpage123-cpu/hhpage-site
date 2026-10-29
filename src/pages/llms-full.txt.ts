import type { APIRoute } from 'astro';
import { allLlmPages, renderLlmsFull } from '@/lib/llms';
export const GET: APIRoute = async () => new Response(renderLlmsFull(await allLlmPages()), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
