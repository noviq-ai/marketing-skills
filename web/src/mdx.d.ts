/// <reference types="vite/client" />

declare module '*.mdx' {
  const MDXComponent: import('react').ComponentType<Record<string, unknown>>
  export default MDXComponent
}
