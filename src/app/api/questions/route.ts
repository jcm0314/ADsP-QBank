import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')

    const questions = await prisma.question.findMany({
      where: {
        ...(category && { category }),
        ...(difficulty && { difficulty: parseInt(difficulty) }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const parsedQuestions = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options)
    }))

    return NextResponse.json(parsedQuestions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const question = await prisma.question.create({
      data: {
        ...body,
        options: JSON.stringify(body.options)
      },
    })

    return NextResponse.json({
      ...question,
      options: JSON.parse(question.options)
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
