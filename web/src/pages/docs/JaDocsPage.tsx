import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function JaDocsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6">
      <h1 className="sr-only">Japanese Documentation</h1>
      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Japanese Docs</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          日本語ドキュメントをここにまとめます。
        </p>
        <div className="mt-4 flex gap-2">
          <a href="https://github.com/noviq-ai/marketing-skills/blob/main/README.ja.md" target="_blank" rel="noreferrer">
            <Button size="sm">README.ja を開く</Button>
          </a>
          <Link to="/docs">
            <Button size="sm" variant="outline">
              Docsに戻る
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
