import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const count = await prisma.question.count()
    if (count === 0) {
      return NextResponse.json(
        { error: 'No questions available' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const skip = Math.floor(Math.random() * count)
    const [q] = await prisma.question.findMany({ take: 1, skip })
    if (!q) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    const parsed = { ...q, options: safeParseOptions(q.options) }
    return NextResponse.json(parsed, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('random API error:', e)
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

function safeParseOptions(s: string) {
  try { return JSON.parse(s) } catch { return [] }
}