import { useMemo, useState } from 'react'
import { IconExternalLink, IconSearch, IconTags } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import HomeContent from '../content/home.mdx'
import { skillItems } from '../data/skills'
import type { SkillCategory } from '../types/content'

const allCategories: SkillCategory[] = [
  'Measurement & Analytics',
  'SEO',
  'Paid Ads',
  'LINE',
  'Content & Creative',
]

export function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SkillCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return skillItems.filter((item) => {
      const categoryMatch = category === 'All' || item.category === category
      const queryMatch =
        normalized.length === 0 ||
        item.name.toLowerCase().includes(normalized) ||
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.triggers.some((trigger) => trigger.toLowerCase().includes(normalized))

      return categoryMatch && queryMatch
    })
  }, [category, query])

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <h1 className="sr-only">Marketing Skills</h1>
      <section className="py-1">
        <HomeContent />
      </section>

      <section className="mt-4 space-y-3">
        <label className="relative block">
          <Input
            type="text"
            value={query}
            className="pl-9"
            placeholder="Search skill, trigger, category..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            <IconSearch size={16} stroke={1.8} />
          </span>
        </label>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill category filters">
          <Button
            type="button"
            size="sm"
            variant={category === 'All' ? 'default' : 'outline'}
            onClick={() => setCategory('All')}
          >
            <IconTags size={14} stroke={1.8} /> All
          </Button>
          {allCategories.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={category === item ? 'default' : 'outline'}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.name}>
            <CardHeader className="gap-2">
              <Badge variant="secondary" className="w-fit">
                {item.category}
              </Badge>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {item.triggers.map((trigger) => (
                  <Badge key={trigger} variant="outline">
                    {trigger}
                  </Badge>
                ))}
              </div>
              <a href={item.githubUrl} target="_blank" rel="noreferrer" className="inline-flex">
                <Button size="sm" variant="outline">
                  GitHub
                  <IconExternalLink size={14} stroke={1.8} />
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
