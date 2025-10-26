import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Question } from '@prisma/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') ?? undefined
    const difficulty = searchParams.get('difficulty')
    const difficultyNum = difficulty ? Number(difficulty) : undefined

    const list = await prisma.question.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(difficultyNum !== undefined ? { difficulty: difficultyNum } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    const parsed = list.map((q: Question) => ({ ...q, options: safeParseOptions(q.options) }))
    return NextResponse.json(parsed, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('questions API error:', e)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const created = await prisma.question.create({
      data: { ...body, options: JSON.stringify(body.options) },
    })
    const parsed = { ...created, options: safeParseOptions(created.options) }
    return NextResponse.json(parsed, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('create question API error:', e)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

function safeParseOptions(s: string): string[] {
  try { 
    return JSON.parse(s) 
  } catch { 
    return [] 
  }
}