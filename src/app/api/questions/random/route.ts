import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 전체 문제 개수 조회
    const count = await prisma.question.count()
    
    if (count === 0) {
      return NextResponse.json({ error: 'No questions available' }, { status: 404 })
    }

    // 랜덤 인덱스 생성
    const skip = Math.floor(Math.random() * count)
    
    // 랜덤 문제 조회
    const question = await prisma.question.findMany({
      take: 1,
      skip: skip,
    })

    if (!question[0]) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // options를 JSON 파싱
    const parsedQuestion = {
      ...question[0],
      options: JSON.parse(question[0].options)
    }

    return NextResponse.json(parsedQuestion)
  } catch (error) {
    console.error('Failed to fetch random question:', error)
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 })
  }
}
