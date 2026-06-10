import { redirect } from 'next/navigation'

const REDIRECTS: Record<string, string> = {
  'core-curriculum': '/curriculum/semester-1/core',
  'guitar-track': '/curriculum/semester-1/guitar',
  'piano-track': '/curriculum/semester-1/piano',
  'progress-tracker': '/curriculum/semester-1/progress',
}

export function generateStaticParams() {
  return Object.keys(REDIRECTS).map(doc => ({ doc }))
}

export default async function Semester1DocRedirect({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params
  const target = REDIRECTS[doc]
  if (target) redirect(target)
  redirect('/curriculum/semester-1')
}
