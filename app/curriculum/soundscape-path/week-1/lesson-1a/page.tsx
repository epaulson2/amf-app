import type { Metadata } from 'next'
import Lesson1A from '@/components/soundscape/week1/Lesson1A'

export const metadata: Metadata = { title: 'Week 1 · Lesson 1A — Ajourné into Music' }

export default function Page() {
  return <Lesson1A />
}
