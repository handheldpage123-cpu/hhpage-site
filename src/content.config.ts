import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Required frontmatter for every page-producing entry. These fields feed
 * <title>, meta description, schema, llms.txt and the content plan sheet.
 */
const page = {
  title: z.string(),
  metaTitle: z.string().max(60).optional(),
  description: z.string().min(70).max(160), // meta description
  summary: z.string().max(200), // one sentence for llms.txt
  primaryKeyword: z.string(),
  targetQuestions: z.array(z.string()).default([]),
  primaryCta: z.enum(['book', 'contact', 'support']).default('book'),
  datePublished: z.coerce.date(),
  dateModified: z.coerce.date(),
  refreshCadence: z.enum(['quarterly', 'semiannual', 'annual']).default('quarterly'),
  ogImage: z.string().optional(),
  draft: z.boolean().default(false),
  order: z.number().default(100),
};

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    ...page,
    shortName: z.string(),
    icon: z.string().default('spark'),
    outcomes: z.array(z.string()).min(2),
    includes: z.array(z.string()).min(3),
    startingAt: z.string().optional(), // e.g. "$X/mo" once pricing is approved
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    schemaType: z.literal('Service').default('Service'),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/industries' }),
  schema: z.object({
    ...page,
    shortName: z.string(),
    painPoints: z.array(z.string()).min(3),
    recommendedServices: z.array(z.string()).min(2), // service slugs
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    ...page,
    client: z.string(),
    industry: z.string(), // industry slug
    services: z.array(z.string()), // service slugs
    website: z.string().url().optional(),
    results: z.array(z.object({ metric: z.string(), before: z.string(), after: z.string(), period: z.string().optional() })).min(1),
    quote: z.object({ text: z.string(), name: z.string(), role: z.string() }).optional(),
    placeholder: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    headshot: z.string().optional(),
    linkedin: z.string().url().optional(),
    author: z.boolean().default(false), // may be credited on blog posts
    order: z.number().default(100),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    topic: z.enum(['pricing', 'process', 'websites', 'seo', 'ads', 'general']).default('general'),
    order: z.number().default(100),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    ...page,
    author: z.string(), // team slug
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { services, industries, caseStudies, team, faqs, posts };
