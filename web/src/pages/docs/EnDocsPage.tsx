import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function EnDocsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6">
      <h1 className="sr-only">English Documentation</h1>
      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">English Docs</h2>
        <p className="mt-2 text-sm text-muted-foreground">Marketing Skills documentation overview.</p>

        <div className="mt-4 space-y-4 text-sm">
          <section>
            <h3 className="font-medium">What are Skills?</h3>
            <p className="mt-1 text-muted-foreground">
              Skills are markdown files that provide AI agents with reusable knowledge and workflows for specific marketing tasks.
            </p>
          </section>

          <section>
            <h3 className="font-medium">Available Categories</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Measurement & Analytics</li>
              <li>SEO</li>
              <li>Paid Ads</li>
              <li>LINE</li>
              <li>Content & Creative</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium">Quick Start</h3>
            <pre className="mt-1 overflow-x-auto rounded-md border bg-muted/40 p-3 text-xs">
              <code>npx skills add noviq-ai/marketing-skills</code>
            </pre>
          </section>
        </div>

        <div className="mt-5 flex gap-2">
          <Link to="/docs">
            <Button size="sm" variant="outline">
              Back to Docs
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
