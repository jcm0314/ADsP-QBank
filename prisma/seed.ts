import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  {
    title: '데이터베이스 정규화의 주요 목적은?',
    content: '데이터베이스 정규화를 수행하는 주요 목적으로 가장 적절한 것은?',
    category: '데이터 저장',
    difficulty: 2,
    options: JSON.stringify([
      '데이터 중복 최소화 및 무결성 향상',
      '데이터 검색 속도 향상',
      '데이터 저장 공간 확대',
      '데이터 암호화 강화'
    ]),
    answer: 0,
    explanation: '정규화는 데이터 중복을 최소화하고 데이터 무결성을 향상시키기 위한 과정입니다.'
  },
  {
    title: 'SQL의 DISTINCT 키워드 역할은?',
    content: 'SQL에서 DISTINCT 키워드는 무엇을 위해 사용되는가?',
    category: 'SQL',
    difficulty: 1,
    options: JSON.stringify([
      '중복된 행 제거',
      '데이터 정렬',
      'NULL 값 제거',
      '테이블 생성'
    ]),
    answer: 0,
    explanation: 'DISTINCT는 SELECT 문에서 중복된 행을 제거하고 고유한 값만 반환합니다.'
  },
  {
    title: '1차 정규형(1NF)의 조건은?',
    content: '관계형 데이터베이스에서 1차 정규형(1NF)을 만족하기 위한 조건은?',
    category: '데이터 저장',
    difficulty: 2,
    options: JSON.stringify([
      '모든 속성이 원자값을 가져야 함',
      '부분 함수 종속성이 제거되어야 함',
      '이행 함수 종속성이 제거되어야 함',
      '다치 종속성이 제거되어야 함'
    ]),
    answer: 0,
    explanation: '1차 정규형은 테이블의 모든 속성이 원자값(atomic value)을 가져야 한다는 조건입니다.'
  },
  {
    title: 'GROUP BY 절의 역할은?',
    content: 'SQL에서 GROUP BY 절은 어떤 역할을 하는가?',
    category: 'SQL',
    difficulty: 1,
    options: JSON.stringify([
      '특정 컬럼을 기준으로 그룹화',
      '데이터를 정렬',
      '중복 제거',
      '테이블 조인'
    ]),
    answer: 0,
    explanation: 'GROUP BY는 하나 이상의 컬럼을 기준으로 데이터를 그룹화하여 집계 함수를 적용할 때 사용합니다.'
  },
  {
    title: '빅데이터의 3V 특징이 아닌 것은?',
    content: '빅데이터의 대표적인 3V 특징에 해당하지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      'Visibility (가시성)',
      'Volume (규모)',
      'Velocity (속도)',
      'Variety (다양성)'
    ]),
    answer: 0,
    explanation: '빅데이터의 3V는 Volume(규모), Velocity(속도), Variety(다양성)입니다. Visibility는 3V에 포함되지 않습니다.'
  },
  {
    title: 'INNER JOIN의 결과는?',
    content: 'SQL의 INNER JOIN은 어떤 결과를 반환하는가?',
    category: 'SQL',
    difficulty: 2,
    options: JSON.stringify([
      '두 테이블에 모두 존재하는 행만 반환',
      '왼쪽 테이블의 모든 행 반환',
      '오른쪽 테이블의 모든 행 반환',
      '두 테이블의 모든 행 반환'
    ]),
    answer: 0,
    explanation: 'INNER JOIN은 두 테이블에서 조인 조건을 만족하는 행만 반환합니다.'
  },
  {
    title: '데이터 마이닝의 주요 목적은?',
    content: '데이터 마이닝(Data Mining)의 주요 목적으로 가장 적절한 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '데이터에서 유용한 패턴과 지식 발견',
      '데이터 저장 공간 최적화',
      '데이터 백업 및 복구',
      '데이터 암호화'
    ]),
    answer: 0,
    explanation: '데이터 마이닝은 대량의 데이터에서 유용한 패턴, 관계, 지식을 발견하는 과정입니다.'
  },
  {
    title: 'PRIMARY KEY의 특징은?',
    content: '관계형 데이터베이스에서 PRIMARY KEY의 특징으로 올바른 것은?',
    category: '데이터 저장',
    difficulty: 1,
    options: JSON.stringify([
      '유일성과 NOT NULL 제약 조건을 가짐',
      '중복 값을 허용함',
      'NULL 값을 허용함',
      '여러 개 설정 가능'
    ]),
    answer: 0,
    explanation: 'PRIMARY KEY는 테이블에서 각 행을 유일하게 식별하며, 중복과 NULL 값을 허용하지 않습니다.'
  },
  {
    title: 'ETL의 의미는?',
    content: 'ETL 프로세스의 각 단계를 올바르게 나열한 것은?',
    category: '데이터 수집',
    difficulty: 2,
    options: JSON.stringify([
      'Extract, Transform, Load',
      'Export, Transfer, Link',
      'Execute, Test, Launch',
      'Evaluate, Track, Log'
    ]),
    answer: 0,
    explanation: 'ETL은 Extract(추출), Transform(변환), Load(적재)의 약자로 데이터 통합 프로세스입니다.'
  },
  {
    title: 'WHERE vs HAVING 차이는?',
    content: 'SQL에서 WHERE 절과 HAVING 절의 차이는?',
    category: 'SQL',
    difficulty: 2,
    options: JSON.stringify([
      'WHERE는 그룹화 전, HAVING은 그룹화 후 조건',
      'WHERE는 그룹화 후, HAVING은 그룹화 전 조건',
      '완전히 동일한 기능',
      'WHERE는 SELECT, HAVING은 UPDATE에서 사용'
    ]),
    answer: 0,
    explanation: 'WHERE는 그룹화 이전의 행을 필터링하고, HAVING은 GROUP BY 이후의 그룹을 필터링합니다.'
  }
]

async function main() {
  console.log('시드 데이터 생성 시작...')
  
  // 기존 데이터 삭제
  await prisma.question.deleteMany()
  console.log('기존 데이터 삭제 완료')

  // 10개 문제를 10번 반복하여 100개 생성
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < questions.length; j++) {
      const q = questions[j]
      await prisma.question.create({
        data: {
          title: `${q.title} [${i * 10 + j + 1}]`,
          content: q.content,
          category: q.category,
          difficulty: q.difficulty,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation
        }
      })
    }
  }

  const count = await prisma.question.count()
  console.log(`✅ ${count}개의 문제가 생성되었습니다!`)
}

main()
  .catch((e) => {
    console.error('❌ 에러 발생:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()  // disconnect() → $disconnect()로 변경
  })