import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  source: string
}

export default function MarkdownContent({ source }: MarkdownContentProps) {
  return (
    <div className="prose prose-slate max-w-none amf-prose">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            // Treat as plain Markdown (not MDX) to avoid JSX-parsing issues
            // with content that contains angle brackets, e.g. <10ms
            format: 'md',
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  )
}
