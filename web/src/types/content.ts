export type SkillCategory =
  | 'Measurement & Analytics'
  | 'SEO'
  | 'Paid Ads'
  | 'LINE'
  | 'Content & Creative'

export interface SkillItem {
  name: string
  title: string
  description: string
  category: SkillCategory
  triggers: string[]
  githubUrl: string
}

export interface DocSection {
  title: string
  description: string
  href: string
}
