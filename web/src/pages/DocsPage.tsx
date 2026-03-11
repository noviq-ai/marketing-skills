import { IconArrowNarrowRight } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import DocsContent from '../content/docs.mdx'
import { docSections } from '../data/skills'

export function DocsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <h1 className="sr-only">Documentation Hub</h1>
      <section className="rounded-xl border bg-card p-6">
        <DocsContent />
      </section>

      <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {docSections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2">
              <Link
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                to={section.href}
              >
                <span>Open page</span>
                <IconArrowNarrowRight size={18} stroke={1.8} />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
