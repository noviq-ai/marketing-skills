import type { DocSection, SkillItem } from '../types/content'

export const skillItems: SkillItem[] = [
  {
    name: 'ga4-measurement',
    title: 'GA4 Measurement',
    description: 'GA4/GTM tracking plan design, event implementation, and compliance support.',
    category: 'Measurement & Analytics',
    triggers: ['GA4', 'GTM', 'conversion tracking'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/ga4-measurement/SKILL.md',
  },
  {
    name: 'ga4-analysis',
    title: 'GA4 Analysis',
    description: 'Analyze traffic, conversion funnels, and campaign effectiveness in GA4.',
    category: 'Measurement & Analytics',
    triggers: ['traffic drop', 'channel report', 'funnel'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/ga4-analysis/SKILL.md',
  },
  {
    name: 'seo-health-check',
    title: 'SEO Health Check',
    description: 'Technical and on-page SEO audit framework with Japan-specific practices.',
    category: 'SEO',
    triggers: ['SEO audit', 'indexing issue', 'Core Web Vitals'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/seo-health-check/SKILL.md',
  },
  {
    name: 'ad-campaign-ops',
    title: 'Ad Campaign Ops',
    description: 'Multi-platform paid ads planning, budget allocation, and optimization.',
    category: 'Paid Ads',
    triggers: ['ROAS', 'CPA', 'Google Ads'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/ad-campaign-ops/SKILL.md',
  },
  {
    name: 'line-engagement',
    title: 'LINE Engagement',
    description: 'LINE Official Account strategy, segmentation, and campaign design.',
    category: 'LINE',
    triggers: ['LINE配信', 'rich menu', 'narrowcast'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/line-engagement/SKILL.md',
  },
  {
    name: 'social-posts',
    title: 'Social Posts',
    description: 'Organic social content strategy and post generation for each platform.',
    category: 'Content & Creative',
    triggers: ['X post', 'Instagram', 'TikTok'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/social-posts/SKILL.md',
  },
  {
    name: 'ad-copy-lab',
    title: 'Ad Copy Lab',
    description: 'Generate ad headlines, descriptions, and creative testing ideas.',
    category: 'Content & Creative',
    triggers: ['広告文', 'RSA headline', 'ad creative'],
    githubUrl: 'https://github.com/noviq-ai/marketing-skills/blob/main/skills/ad-copy-lab/SKILL.md',
  },
]

export const docSections: DocSection[] = [
  {
    title: 'English Docs',
    description: 'Guides and references in English.',
    href: 'https://github.com/noviq-ai/marketing-skills/tree/main/docs/en',
  },
  {
    title: 'Japanese Docs',
    description: '日本語で読めるガイドと解説.',
    href: 'https://github.com/noviq-ai/marketing-skills/tree/main/docs/ja',
  },
  {
    title: 'README (EN)',
    description: 'Project overview and usage.',
    href: 'https://github.com/noviq-ai/marketing-skills/blob/main/README.md',
  },
  {
    title: 'README (JA)',
    description: '日本語の概要と使い方.',
    href: 'https://github.com/noviq-ai/marketing-skills/blob/main/README.ja.md',
  },
]
