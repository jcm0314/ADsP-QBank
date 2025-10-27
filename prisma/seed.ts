import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  {
    title: '데이터 분석 기획의 3C 분석이 아닌 것은?',
    content: '데이터 분석 기획 시 활용되는 3C 분석에 해당하지 않는 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      'Context (상황 분석)',
      'Customer (고객)',
      'Competitor (경쟁자)',
      'Company (자사)'
    ]),
    answer: 0,
    explanation: '3C 분석은 Customer(고객), Competitor(경쟁자), Company(자사)를 의미합니다. Context는 3C에 포함되지 않습니다.'
  },
  {
    title: '분석 과제 발굴 방법론 중 하향식 접근법은?',
    content: '분석 과제 발굴 시 하향식(Top-Down) 접근 방법의 특징으로 옳은 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '전략적 중요도에 따라 우선순위 결정',
      '실무자의 문제 제기로 시작',
      '현장의 니즈 중심 접근',
      '상향식 의사결정 구조'
    ]),
    answer: 0,
    explanation: '하향식 접근법은 경영진의 전략적 목표에서 출발하여 분석 과제를 도출하고, 전략적 중요도에 따라 우선순위를 결정합니다.'
  },
  {
    title: '데이터 마트(Data Mart)의 특징은?',
    content: '데이터 웨어하우스와 비교한 데이터 마트의 특징으로 옳은 것은?',
    category: '데이터 저장',
    difficulty: 2,
    options: JSON.stringify([
      '특정 부서나 주제 중심의 소규모 데이터 저장소',
      '전사적 통합 데이터 저장소',
      '실시간 트랜잭션 처리 중심',
      '정규화된 운영 데이터베이스'
    ]),
    answer: 0,
    explanation: '데이터 마트는 특정 부서나 업무 영역을 위한 주제 중심의 소규모 데이터 저장소로, 데이터 웨어하우스의 부분집합입니다.'
  },
  {
    title: '분석 방법론 CRISP-DM의 단계가 아닌 것은?',
    content: 'CRISP-DM(Cross Industry Standard Process for Data Mining) 방법론의 6단계에 포함되지 않는 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '프로젝트 관리',
      '업무 이해',
      '데이터 이해',
      '데이터 준비'
    ]),
    answer: 0,
    explanation: 'CRISP-DM의 6단계는 업무 이해, 데이터 이해, 데이터 준비, 모델링, 평가, 전개입니다. 프로젝트 관리는 별도 영역입니다.'
  },
  {
    title: '비정형 데이터의 예시가 아닌 것은?',
    content: '다음 중 비정형 데이터에 해당하지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      '관계형 데이터베이스 테이블',
      'SNS 텍스트',
      '이미지 파일',
      '동영상'
    ]),
    answer: 0,
    explanation: '관계형 데이터베이스 테이블은 정형 데이터입니다. 비정형 데이터는 구조화되지 않은 텍스트, 이미지, 동영상 등을 의미합니다.'
  },
  {
    title: '탐색적 데이터 분석(EDA)의 목적은?',
    content: '탐색적 데이터 분석(Exploratory Data Analysis)의 주요 목적으로 가장 적절한 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '데이터의 특성과 패턴을 파악하여 가설 수립',
      '최종 예측 모델 구축',
      '데이터베이스 정규화',
      '프로젝트 일정 수립'
    ]),
    answer: 0,
    explanation: 'EDA는 데이터를 다양한 각도에서 관찰하고 이해하여 데이터의 특성, 패턴, 이상치 등을 파악하고 분석 가설을 수립하는 과정입니다.'
  },
  {
    title: '빅데이터의 특징 5V에 포함되지 않는 것은?',
    content: '빅데이터의 특징을 나타내는 5V에 해당하지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      'Validity (타당성)',
      'Volume (규모)',
      'Velocity (속도)',
      'Variety (다양성)'
    ]),
    answer: 0,
    explanation: '빅데이터의 5V는 Volume(규모), Velocity(속도), Variety(다양성), Veracity(정확성), Value(가치)입니다.'
  },
  {
    title: '데이터 거버넌스의 주요 목적은?',
    content: '데이터 거버넌스(Data Governance)의 주요 목적으로 가장 적절한 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '데이터 품질 관리 및 정책 수립',
      '데이터베이스 백업',
      '네트워크 보안 강화',
      '서버 성능 최적화'
    ]),
    answer: 0,
    explanation: '데이터 거버넌스는 조직의 데이터 자산을 효과적으로 관리하기 위한 정책, 프로세스, 조직 체계를 수립하고 데이터 품질을 관리하는 활동입니다.'
  },
  {
    title: '분석 마스터 플랜 수립 시 고려사항이 아닌 것은?',
    content: '데이터 분석 마스터 플랜 수립 시 고려해야 할 사항이 아닌 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '개별 직원의 연봉 수준',
      '분석 로드맵 수립',
      '분석 조직 및 인력 계획',
      '분석 인프라 구축 계획'
    ]),
    answer: 0,
    explanation: '분석 마스터 플랜에는 분석 과제 및 로드맵, 조직 및 역할 정의, 인프라 및 데이터 구축 계획이 포함되며, 개별 연봉 수준은 직접적인 고려사항이 아닙니다.'
  },
  {
    title: '데이터 수집 방법 중 로그 수집의 특징은?',
    content: '웹 로그 데이터 수집의 특징으로 옳은 것은?',
    category: '데이터 수집',
    difficulty: 2,
    options: JSON.stringify([
      '사용자 행동 패턴 분석 가능',
      '설문조사 방식으로 수집',
      '구조화된 정형 데이터만 수집',
      '실시간 수집 불가능'
    ]),
    answer: 0,
    explanation: '웹 로그는 사용자의 웹사이트 방문 기록, 클릭 패턴 등을 자동으로 수집하여 사용자 행동 분석에 활용할 수 있습니다.'
  }
]

async function main() {
  console.log('ADsP 시드 데이터 생성 시작...')
  
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
    console.log(`✅ ${(i + 1) * 10}개 문제 생성 완료...`)
  }

  const count = await prisma.question.count()
  console.log(`\n🎉 총 ${count}개의 ADsP 문제가 생성되었습니다!`)
}

main()
  .catch((e) => {
    console.error('❌ 에러 발생:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })