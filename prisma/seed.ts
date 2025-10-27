import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ADsP 100 문제 데이터
const questions = [
  // 기존 10문제
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
    category: '데이터의 이해',
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
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '사용자 행동 패턴 분석 가능',
      '설문조사 방식으로 수집',
      '구조화된 정형 데이터만 수집',
      '실시간 수집 불가능'
    ]),
    answer: 0,
    explanation: '웹 로그는 사용자의 웹사이트 방문 기록, 클릭 패턴 등을 자동으로 수집하여 사용자 행동 분석에 활용할 수 있습니다.'
  },

  // --- 추가 90문제 ---

  // 데이터의 이해 (30문제)
  {
    title: '데이터베이스의 ACID 특성이 아닌 것은?',
    content: '트랜잭션의 안정성을 보장하기 위한 ACID 특성에 해당하지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 3,
    options: JSON.stringify([
      'Availability (가용성)',
      'Atomicity (원자성)',
      'Consistency (일관성)',
      'Isolation (고립성)'
    ]),
    answer: 0,
    explanation: 'ACID는 원자성(Atomicity), 일관성(Consistency), 고립성(Isolation), 지속성(Durability)을 의미합니다.'
  },
  {
    title: '메타데이터(Metadata)의 설명으로 옳은 것은?',
    content: '데이터에 대한 데이터로 불리는 메타데이터의 설명으로 가장 적절한 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '데이터의 구조, 속성, 이력 등을 설명하는 데이터',
      '실제 운영 환경의 트랜잭션 데이터',
      '분석 모델링 결과 데이터',
      '비정형 텍스트 데이터'
    ]),
    answer: 0,
    explanation: '메타데이터는 데이터의 구조, 속성, 위치, 이력 등 데이터 자체를 설명하는 데이터를 의미합니다.'
  },
  {
    title: '반정형 데이터의 예시로 적절한 것은?',
    content: '다음 중 반정형(Semi-structured) 데이터의 예시로 가장 적절한 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      'JSON 파일',
      '관계형 DB 테이블',
      '오디오 파일',
      '고객 연령 (숫자)'
    ]),
    answer: 0,
    explanation: 'JSON, XML, HTML 등은 스키마 정보를 포함하고 있어 정형 데이터의 특징(테이블)은 없지만, 구조를 가지고 있어 반정형 데이터로 분류됩니다.'
  },
  {
    title: '데이터 품질 관리의 중요 요소가 아닌 것은?',
    content: '데이터 품질 관리를 위한 주요 요소(기준)로 거리가 먼 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '다양성 (Variety)',
      '정확성 (Accuracy)',
      '완전성 (Completeness)',
      '일관성 (Consistency)'
    ]),
    answer: 0,
    explanation: '데이터 품질의 주요 기준은 정확성, 완전성, 일관성, 유일성, 유효성, 적시성 등입니다. 다양성은 빅데이터의 특징(3V) 중 하나입니다.'
  },
  {
    title: '개인정보 비식별화 기법 중 총계처리는?',
    content: '개인정보 비식별화 기법 중, 데이터의 총합 값이나 평균값 등을 보여주는 기법은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '총계처리 (Aggregation)',
      '가명처리 (Pseudonymization)',
      '데이터 마스킹 (Data Masking)',
      '범주화 (Categorization)'
    ]),
    answer: 0,
    explanation: '총계처리는 개별 데이터를 합산하여 통계값(총합, 평균 등)으로 보여줌으로써 개인 식별을 방지하는 기법입니다.'
  },
  {
    title: '데이터 웨어하우스(DW)의 특징이 아닌 것은?',
    content: '데이터 웨어하우스(Data Warehouse)의 특징으로 옳지 않은 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '실시간 수정 및 삭제 발생 (Volatility)',
      '주제 지향성 (Subject-Oriented)',
      '통합성 (Integrated)',
      '시계열성 (Time-Variant)'
    ]),
    answer: 0,
    explanation: '데이터 웨어하우스는 비휘발성(Non-Volatile) 데이터 저장소로, 한 번 적재된 데이터는 수정되거나 삭제되지 않고 누적됩니다.'
  },
  {
    title: 'ETL 과정에 해당하지 않는 것은?',
    content: '데이터 웨어하우스 구축 시 ETL 과정에 포함되지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '모델링 (Modeling)',
      '추출 (Extraction)',
      '변환 (Transformation)',
      '적재 (Loading)'
    ]),
    answer: 0,
    explanation: 'ETL은 원본 시스템에서 데이터를 추출(Extract)하고, 필요한 형태로 변환(Transform)하여, 데이터 웨어하우스에 적재(Load)하는 과정을 의미합니다.'
  },
  {
    title: '데이터의 가치 측정 접근법이 아닌 것은?',
    content: '데이터의 경제적 가치를 측정하는 접근법으로 거리가 먼 것은?',
    category: '데이터의 이해',
    difficulty: 3,
    options: JSON.stringify([
      '기술적 접근법 (Technical Approach)',
      '비용 기반 접근법 (Cost-based Approach)',
      '시장 기반 접근법 (Market-based Approach)',
      '수익 기반 접근법 (Income-based Approach)'
    ]),
    answer: 0,
    explanation: '데이터 가치 측정 접근법은 크게 비용 기반(구축 비용), 시장 기반(거래 가격), 수익 기반(미래 수익 창출) 접근법으로 나뉩니다.'
  },
  {
    title: 'OLTP 시스템의 특징은?',
    content: 'OLTP(Online Transaction Processing) 시스템의 특징으로 옳은 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '실시간 트랜잭션 처리 및 빠른 응답 속도',
      '대규모 데이터 분석 및 리포팅',
      '과거 데이터 누적 및 관리',
      '비정형 데이터 분석'
    ]),
    answer: 0,
    explanation: 'OLTP는 은행 거래, 주문 처리 등 실시간으로 발생하는 트랜잭션을 처리하는 시스템으로, 빠른 응답 속도와 데이터 무결성 유지가 중요합니다.'
  },
  {
    title: 'OLAP 시스템의 특징은?',
    content: 'OLAP(Online Analytical Processing) 시스템의 특징으로 옳은 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '다차원 데이터 분석 및 의사결정 지원',
      '소규모 데이터의 빠른 삽입/수정/삭제',
      '운영 시스템의 백업',
      '실시간 거래 처리'
    ]),
    answer: 0,
    explanation: 'OLAP은 데이터 웨어하우스의 데이터를 다차원적으로 분석하여 사용자의 의사결정을 지원하는 분석 시스템입니다.'
  },
  {
    title: '데이터베이스 정규화의 목적은?',
    content: '관계형 데이터베이스에서 정규화(Normalization)를 수행하는 주된 목적은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '데이터 중복 최소화 및 이상 현상 방지',
      '데이터 조회 속도 향상',
      '데이터 암호화',
      '데이터 백업'
    ]),
    answer: 0,
    explanation: '정규화는 데이터의 중복을 최소화하고, 데이터 삽입/수정/삭제 시 발생할 수 있는 이상 현상(Anomaly)을 방지하여 데이터 무결성을 유지하기 위함입니다.'
  },
  {
    title: '빅데이터 플랫폼 하둡(Hadoop)의 핵심 구성요소가 아닌 것은?',
    content: '하둡 에코시스템의 핵심 구성요소로 거리가 먼 것은?',
    category: '데이터의 이해',
    difficulty: 3,
    options: JSON.stringify([
      'RDBMS',
      'HDFS (분산 파일 시스템)',
      'MapReduce (분산 처리)',
      'YARN (자원 관리)'
    ]),
    answer: 0,
    explanation: '하둡의 핵심 구성요소는 분산 저장을 담당하는 HDFS와 분산 처리를 담당하는 MapReduce, 그리고 자원 관리를 담당하는 YARN입니다. RDBMS는 전통적인 관계형 데이터베이스입니다.'
  },
  {
    title: 'NoSQL 데이터베이스의 유형이 아닌 것은?',
    content: 'NoSQL 데이터베이스의 주요 유형으로 분류되지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 3,
    options: JSON.stringify([
      '관계형 모델 (Relational Model)',
      '키-값 모델 (Key-Value Model)',
      '문서 모델 (Document Model)',
      '컬럼 기반 모델 (Column-Family Model)'
    ]),
    answer: 0,
    explanation: 'NoSQL은 관계형 모델을 벗어난 데이터베이스 유형으로, 키-값, 문서, 컬럼 기반, 그래프 모델 등이 있습니다.'
  },
  {
    title: '데이터 거버넌스의 구성요소가 아닌 것은?',
    content: '데이터 거버넌스 체계를 구성하는 주요 요소로 거리가 먼 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '서버 하드웨어 사양',
      '원칙 (Principle)',
      '조직 (Organization)',
      '프로세스 (Process)'
    ]),
    answer: 0,
    explanation: '데이터 거버넌스 체계는 원칙, 조직, 프로세스(및 표준)를 기반으로 구축됩니다. 하드웨어 사양은 인프라 영역입니다.'
  },
  {
    title: '데이터 사이언티스트의 역량이 아닌 것은?',
    content: '데이터 사이언티스트에게 요구되는 핵심 역량으로 거리가 먼 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      '하드웨어 유지보수 (Hardware Maintenance)',
      '수학/통계 지식 (Math/Statistics)',
      'IT/프로그래밍 기술 (IT/Programming)',
      '비즈니스 이해 (Business Acumen)'
    ]),
    answer: 0,
    explanation: '데이터 사이언티스트는 수학/통계 지식, IT/프로그래밍 기술, 그리고 비즈니스 이해 및 커뮤니케이션 능력을 갖춰야 합니다.'
  },
  {
    title: '데이터베이스 스키마(Schema)의 정의는?',
    content: '데이터베이스 스키마에 대한 설명으로 가장 옳은 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '데이터베이스의 구조와 제약조건 명세',
      '데이터베이스에 저장된 실제 값',
      '데이터베이스 사용자 계정',
      '데이터베이스 백업 파일'
    ]),
    answer: 0,
    explanation: '스키마는 데이터베이스의 전체적인 구조, 즉 테이블, 컬럼, 데이터 타입, 제약조건 등을 정의한 명세입니다.'
  },
  {
    title: '데이터 품질 기준 중 "유일성(Uniqueness)"은?',
    content: '데이터 품질 기준 중 동일한 데이터가 중복되어 저장되지 않음을 의미하는 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '유일성',
      '정확성',
      '완전성',
      '적시성'
    ]),
    answer: 0,
    explanation: '유일성(Uniqueness)은 데이터가 중복 없이 유일한 값을 가져야 함을 의미합니다. (예: 주민등록번호, PK)'
  },
  {
    title: '데이터 품질 기준 중 "완전성(Completeness)"은?',
    content: '데이터 품질 기준 중 필수 항목이 누락되지 않고 채워져 있음을 의미하는 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '완전성',
      '정확성',
      '유효성',
      '일관성'
    ]),
    answer: 0,
    explanation: '완전성(Completeness)은 필수 데이터 값이 누락되지 않고(Not Null) 모두 채워져 있는 상태를 의미합니다.'
  },
  {
    title: '데이터 품질 기준 중 "유효성(Validity)"은?',
    content: '데이터 품질 기준 중 데이터가 정의된 범위나 형식(예: 날짜 형식)을 만족함을 의미하는 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '유효성',
      '정확성',
      '완전성',
      '유일성'
    ]),
    answer: 0,
    explanation: '유효성(Validity)은 데이터가 사전에 정의된 도메인(범위), 형식, 규칙(예: 2024-10-27)을 준수하는지를 의미합니다.'
  },
  {
    title: '데이터 품질 기준 중 "일관성(Consistency)"은?',
    content: '데이터 품질 기준 중 여러 시스템 간의 데이터가 서로 모순 없이 일치함을 의미하는 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '일관성',
      '정확성',
      '완전성',
      '적시성'
    ]),
    answer: 0,
    explanation: '일관성(Consistency)은 동일한 데이터가 서로 다른 위치(DB, 리포트 등)에서도 동일한 값을 유지함을 의미합니다.'
  },
  {
    title: '데이터 품질 기준 중 "적시성(Timeliness)"은?',
    content: '데이터 품질 기준 중 사용자가 필요로 하는 시점에 데이터가 제공됨을 의미하는 것은?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '적시성',
      '정확성',
      '완전성',
      '유일성'
    ]),
    answer: 0,
    explanation: '적시성(Timeliness)은 데이터가 필요한 시점에 즉시 활용 가능하도록 최신 상태로 유지되고 제공되는 것을 의미합니다.'
  },
  {
    title: '개인정보 비식별화 기법 중 "범주화"는?',
    content: '개인정보 비식별화 기법 중 데이터 값을 특정 범주로 묶어 표현하는 기법은? (예: 32세 -> 30대)',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '범주화 (Categorization)',
      '총계처리 (Aggregation)',
      '데이터 마스킹 (Data Masking)',
      '가명처리 (Pseudonymization)'
    ]),
    answer: 0,
    explanation: '범주화는 연속형 데이터를 특정 구간이나 범주(예: 30-39세)로 변환하여 개인 식별성을 낮추는 기법입니다.'
  },
  {
    title: '개인정보 비식별화 기법 중 "데이터 마스킹"은?',
    content: '개인정보 비식별화 기법 중 데이터의 일부를 가리는 기법은? (예: 홍길동 -> 홍*동)',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      '데이터 마스킹 (Data Masking)',
      '총계처리 (Aggregation)',
      '범주화 (Categorization)',
      '가명처리 (Pseudonymization)'
    ]),
    answer: 0,
    explanation: '데이터 마스킹은 데이터의 민감한 부분을 *, # 등으로 가려서(마스킹) 식별할 수 없도록 하는 기법입니다.'
  },
  {
    title: 'DIKW 피라미드 계층이 아닌 것은?',
    content: '데이터가 지식으로 변환되는 과정을 나타내는 DIKW 피라미드 계층에 속하지 않는 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      'Technology (기술)',
      'Data (데이터)',
      'Information (정보)',
      'Knowledge (지식)'
    ]),
    answer: 0,
    explanation: 'DIKW 피라미드는 데이터(Data) -> 정보(Information) -> 지식(Knowledge) -> 지혜(Wisdom)의 계층 구조를 가집니다.'
  },
  {
    title: 'DIKW 계층 중 "정보(Information)"의 의미는?',
    content: 'DIKW 계층에서 데이터(Data)를 가공하여 의미를 부여한 상태를 무엇이라 하는가?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '정보 (Information)',
      '데이터 (Data)',
      '지식 (Knowledge)',
      '지혜 (Wisdom)'
    ]),
    answer: 0,
    explanation: '정보(Information)는 수집된 데이터를 특정 목적에 맞게 가공(분류, 요약, 계산 등)하여 의미를 부여한 상태입니다.'
  },
  {
    title: 'DIKW 계층 중 "지식(Knowledge)"의 의미는?',
    content: 'DIKW 계층에서 정보(Information)를 체계화하고 일반화하여 미래 예측에 활용할 수 있는 상태는?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      '지식 (Knowledge)',
      '데이터 (Data)',
      '정보 (Information)',
      '지혜 (Wisdom)'
    ]),
    answer: 0,
    explanation: '지식(Knowledge)은 정보가 축적되고 체계화되어 일반적인 규칙이나 패턴, 모델로 만들어진 상태를 의미합니다.'
  },
  {
    title: '기업 내부 데이터 원천이 아닌 것은?',
    content: '기업 데이터 수집 시 내부(Internal) 데이터 원천으로 보기 어려운 것은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      '경쟁사 SNS 데이터',
      '판매 시점 관리 (POS) 데이터',
      '전사적 자원 관리 (ERP) 데이터',
      '고객 관계 관리 (CRM) 데이터'
    ]),
    answer: 0,
    explanation: '경쟁사 SNS 데이터는 기업 외부(External)에서 수집해야 하는 공개 데이터(Open Data) 또는 소셜 데이터입니다.'
  },
  {
    title: '데이터 수집 기술 중 "웹 크롤링"은?',
    content: '자동화된 로봇(봇)을 이용하여 웹사이트의 데이터를 수집하는 기술은?',
    category: '데이터의 이해',
    difficulty: 1,
    options: JSON.stringify([
      '웹 크롤링 (Web Crawling)',
      'API (Application Programming Interface)',
      'ETL (Extract, Transform, Load)',
      '설문조사 (Survey)'
    ]),
    answer: 0,
    explanation: '웹 크롤링(또는 스크레이핑)은 자동화된 프로그램(크롤러)을 이용해 웹 페이지를 탐색하고 필요한 데이터를 추출하는 기술입니다.'
  },
  {
    title: '데이터 수집 기술 중 "API"는?',
    content: '특정 서비스 제공자가 외부에서 데이터를 쉽게 가져갈 수 있도록 미리 정의한 인터페이스(규격)는?',
    category: '데이터의 이해',
    difficulty: 2,
    options: JSON.stringify([
      'API (Application Programming Interface)',
      '웹 크롤링 (Web Crawling)',
      'FTP (File Transfer Protocol)',
      'RSS (Rich Site Summary)'
    ]),
    answer: 0,
    explanation: 'API는 서비스 제공자가 데이터 및 기능을 외부에서 사용할 수 있도록 제공하는 통신 규약입니다. (예: 공공데이터포털 API)'
  },
  {
    title: '데이터 저장소 중 "데이터 레이크(Data Lake)"는?',
    content: '정형, 비정형 등 모든 유형의 데이터를 원시(Raw) 형태 그대로 저장하는 대규모 저장소는?',
    category: '데이터의 이해',
    difficulty: 3,
    options: JSON.stringify([
      '데이터 레이크 (Data Lake)',
      '데이터 웨어하우스 (Data Warehouse)',
      '데이터 마트 (Data Mart)',
      '운영 데이터 저장소 (ODS)'
    ]),
    answer: 0,
    explanation: '데이터 레이크는 모든 형태의 데이터를 가공하지 않은 원시 상태로 저장하여 향후 다양한 분석 목적에 활용할 수 있도록 하는 저장소입니다.'
  },

  // 데이터 분석 기획 (30문제)
  {
    title: '분석 과제 발굴 상향식 접근법의 특징은?',
    content: '분석 과제 발굴 시 상향식(Bottom-Up) 접근 방법의 특징으로 옳은 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '실무자의 현장 문제(Pain Point) 해결 중심',
      '경영진의 전략적 목표에서 시작',
      '전사적 관점의 과제 도출',
      '중장기적 로드맵 기반'
    ]),
    answer: 0,
    explanation: '상향식 접근법은 현업 실무자가 실제 업무에서 겪는 문제를 해결하기 위한 과제를 발굴하고, 이를 취합하여 분석 과제로 정의하는 방식입니다.'
  },
  {
    title: '분석 방법론 KDD의 단계가 아닌 것은?',
    content: 'KDD(Knowledge Discovery in Databases) 분석 방법론의 단계에 해당하지 않는 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '업무 이해 (Business Understanding)',
      '데이터 선택 (Selection)',
      '데이터 전처리 (Preprocessing)',
      '데이터 변환 (Transformation)'
    ]),
    answer: 0,
    explanation: 'KDD의 주요 단계는 데이터 선택, 전처리, 변환, 데이터 마이닝, 해석/평가입니다. 업무 이해는 CRISP-DM의 첫 번째 단계입니다.'
  },
  {
    title: 'CRISP-DM의 1단계 "업무 이해" 활동이 아닌 것은?',
    content: 'CRISP-DM 방법론의 1단계 "업무 이해(Business Understanding)"에서 수행하는 활동으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '데이터 정제 및 통합',
      '비즈니스 목적 파악',
      '상황 파악',
      '분석 목표 설정'
    ]),
    answer: 0,
    explanation: '데이터 정제 및 통합은 3단계 "데이터 준비(Data Preparation)"에서 수행하는 핵심 활동입니다. 1단계에서는 비즈니스 목적과 목표를 정의합니다.'
  },
  {
    title: 'CRISP-DM의 3단계 "데이터 준비" 활동이 아닌 것은?',
    content: 'CRISP-DM 방법론의 3단계 "데이터 준비(Data Preparation)" 활동으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '모델링 기법 선택',
      '데이터 정제 (Cleaning)',
      '데이터 통합 (Integration)',
      '파생 변수 생성 (Feature Engineering)'
    ]),
    answer: 0,
    explanation: '모델링 기법 선택은 4단계 "모델링(Modeling)" 단계에서 수행합니다. 데이터 준비 단계는 분석에 적합한 데이터셋을 만드는 과정입니다.'
  },
  {
    title: 'CRISP-DM의 4단계 "모델링" 활동이 아닌 것은?',
    content: 'CRISP-DM 방법론의 4단계 "모델링(Modeling)" 활동으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '분석 결과 비즈니스 활용',
      '모델링 기법 선택',
      '모델 구축 (Building Model)',
      '모델 성능 평가 (Model Assessment)'
    ]),
    answer: 0,
    explanation: '분석 결과를 비즈니스에 활용하고 적용하는 것은 6단계 "전개(Deployment)"에서 수행합니다. 4단계에서는 모델을 구축하고 기술적으로 평가합니다.'
  },
  {
    title: 'CRISP-DM의 5단계 "평가" 활동의 특징은?',
    content: 'CRISP-DM 방법론의 5단계 "평가(Evaluation)" 활동의 특징으로 가장 적절한 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '분석 모델이 비즈니스 목표에 부합하는지 평가',
      '모델의 기술적 성능(정확도 등)만 평가',
      '데이터 품질 평가',
      '프로젝트 일정 평가'
    ]),
    answer: 0,
    explanation: '5단계 평가는 4단계 모델링에서 평가한 기술적 성능뿐만 아니라, 해당 모델이 원래의 비즈니스 목적과 성공 기준을 달성했는지 종합적으로 평가하는 단계입니다.'
  },
  {
    title: 'CRISP-DM의 6단계 "전개" 활동은?',
    content: 'CRISP-DM 방법론의 마지막 단계로, 분석 모델을 현업 시스템에 적용하고 모니터링하는 단계는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '전개 (Deployment)',
      '업무 이해 (Business Understanding)',
      '모델링 (Modeling)',
      '평가 (Evaluation)'
    ]),
    answer: 0,
    explanation: '전개(Deployment) 단계는 완성된 모델을 실제 운영 시스템에 적용(배포)하고, 지속적으로 모니터링하며 유지보수하는 단계입니다.'
  },
  {
    title: '분석 과제 우선순위 평가 기준이 아닌 것은?',
    content: '분석 과제의 우선순위를 결정할 때 고려하는 기준으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '분석 담당자의 선호도',
      '전략적 중요도 (시급성)',
      '투자 대비 효과 (ROI)',
      '실행 용이성 (난이도)'
    ]),
    answer: 0,
    explanation: '분석 과제 우선순위는 보통 시급성(전략적 중요도)과 난이도(실행 용이성 또는 비용)를 기준으로 평가합니다. 담당자의 선호도는 주관적인 요소입니다.'
  },
  {
    title: '분석 준비도(Readiness) 평가 영역이 아닌 것은?',
    content: '기업의 데이터 분석 준비도를 평가할 때 고려하는 영역으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '경쟁사 분석 수준',
      '분석 인력 및 조직',
      '분석 인프라 (시스템)',
      '데이터 성숙도 (품질, 확보)'
    ]),
    answer: 0,
    explanation: '분석 준비도는 자사(Company)의 분석 역량을 진단하는 것으로, 인력/조직, 인프라, 데이터, 분석 기법 활용 수준 등을 평가합니다. 경쟁사 수준은 외부 환경 분석입니다.'
  },
  {
    title: '분석 과제 정의서에 포함될 내용이 아닌 것은?',
    content: '도출된 분석 과제를 명확히 정의하는 "분석 과제 정의서"에 포함될 내용으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '담당 분석가의 상세 인적 사항',
      '분석의 목적 및 배경',
      '분석 대상 데이터',
      '예상되는 결과 및 활용 방안'
    ]),
    answer: 0,
    explanation: '분석 과제 정의서는 해당 과제의 목적, 배경, 범위, 데이터, 분석 방법, 예상 결과, 평가 기준 등을 명시하는 문서입니다. 담당자의 상세 인적 사항(주소, 연락처 등)은 불필요합니다.'
  },
  {
    title: '분석 로드맵 수립 시 고려사항은?',
    content: '분석 마스터 플랜 수립 시, 우선순위가 정해진 과제들의 단계적 이행 계획을 수립하는 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '분석 로드맵 수립',
      '데이터 수집',
      '모델 배포',
      '일일 업무 보고'
    ]),
    answer: 0,
    explanation: '분석 로드맵은 우선순위에 따라 선정된 분석 과제들을 언제, 어떤 순서로 수행할지 단계적으로 계획한 일정표입니다.'
  },
  {
    title: '분석 거버넌스 체계의 역할은?',
    content: '전사적 차원에서 분석 과제를 지속적으로 관리하고 통제하기 위한 체계는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '분석 거버넌스 체계',
      '데이터베이스 관리 시스템',
      '개인정보보호 정책',
      'IT 헬프데스크'
    ]),
    answer: 0,
    explanation: '분석 거버넌스 체계는 분석 과제의 발굴, 우선순위 평가, 수행, 모니터링, 성과 관리 등 분석 라이프사이클 전반을 관리하고 통제하는 조직, 프로세스, 시스템을 의미합니다.'
  },
  {
    title: '분석 성과 평가 시 ROI 계산 방법은?',
    content: '분석 프로젝트의 성과를 평가하는 ROI(Return on Investment)의 계산식으로 옳은 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '(수익 - 투자 비용) / 투자 비용',
      '총 수익 / 총 비용',
      '투자 비용 / 수익',
      '총 수익 - 총 비용'
    ]),
    answer: 0,
    explanation: 'ROI(투자 대비 수익률)는 투자를 통해 발생한 순수익(수익 - 투자 비용)을 투자 비용으로 나눈 값입니다.'
  },
  {
    title: '분석 과제 유형 중 "Optimization"은?',
    content: '분석 과제 유형 중, 주어진 제약 조건 하에서 특정 목표(예: 수익 최대화, 비용 최소화)를 달성하는 해법을 찾는 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '최적화 (Optimization)',
      '예측 (Prediction)',
      '분류 (Classification)',
      '군집 (Clustering)'
    ]),
    answer: 0,
    explanation: '최적화(Optimization)는 제한된 자원 하에서 최상의 결과를 도출하기 위한 의사결정 문제를 해결하는 분석 기법입니다.'
  },
  {
    title: '분석 과제 유형 중 "Solution"은?',
    content: '분석 과제 유형 중, 기존에 알려지지 않았던 새로운 문제나 현상을 발견하고 원인을 규명하는 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '솔루션/발견 (Solution/Discovery)',
      '최적화 (Optimization)',
      '예측 (Prediction)',
      '통찰 (Insight)'
    ]),
    answer: 0,
    explanation: '솔루션/발견(Solution/Discovery)은 현재 상황을 분석하여 이전에 몰랐던 문제의 원인이나 새로운 패턴을 찾아내는 분석 유형입니다.'
  },
  {
    title: '분석 과제 유형 중 "Insight"는?',
    content: '분석 과제 유형 중, 데이터 분석을 통해 새로운 비즈니스 통찰력이나 아이디어를 도출하는 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '통찰 (Insight)',
      '최적화 (Optimization)',
      '예측 (Prediction)',
      '솔루션/발견 (Solution/Discovery)'
    ]),
    answer: 0,
    explanation: '통찰(Insight)은 데이터 분석을 통해 기존에 알려지지 않았던 새로운 관점이나 비즈니스 기회를 발견하는 것을 의미합니다.'
  },
  {
    title: '분석 프로젝트 관리의 주요 요소가 아닌 것은?',
    content: '분석 프로젝트 관리의 3대 주요 관리 대상(WBS, 일정, 비용) 외 추가 관리 요소로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '팀원 간 친목 도모',
      '범위 (Scope)',
      '품질 (Quality)',
      '리스크 (Risk)'
    ]),
    answer: 0,
    explanation: '프로젝트 관리는 전통적으로 범위, 일정, 비용(WBS)을 관리하며, 추가로 인력, 품질, 리스크, 의사소통 등을 관리합니다.'
  },
  {
    title: 'WBS(작업 분해 구조)의 정의는?',
    content: '프로젝트 관리를 위해 전체 작업을 세부 단위로 분해한 계층적 구조도는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      'WBS (Work Breakdown Structure)',
      'Gantt Chart (간트 차트)',
      'PERT Chart',
      '조직도 (Organization Chart)'
    ]),
    answer: 0,
    explanation: 'WBS(작업 분해 구조)는 프로젝트의 전체 범위를 관리 가능한 작은 작업 단위로 분해하여 계층적으로 표시한 목록입니다.'
  },
  {
    title: '분석 프로젝트 일정 관리 도구가 아닌 것은?',
    content: '분석 프로젝트의 일정을 시각화하고 관리하는 도구로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      'SWOT 분석 매트릭스',
      '간트 차트 (Gantt Chart)',
      'PERT/CPM',
      '마일스톤 (Milestone)'
    ]),
    answer: 0,
    explanation: '간트 차트, PERT/CPM, 마일스톤 등은 일정 관리에 사용됩니다. SWOT 분석은 전략 수립을 위한 환경 분석 기법입니다.'
  },
  {
    title: '프로젝트 일정 지연 시 대처 방안이 아닌 것은?',
    content: '프로젝트 일정이 지연될 때, 이를 만회하기 위한 방법(일정 단축 기법)으로 적절하지 않은 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '프로젝트 범위 확대 (Scope Creep)',
      '자원 추가 투입 (Crashing)',
      '병행 수행 (Fast Tracking)',
      '작업 범위 축소'
    ]),
    answer: 0,
    explanation: '일정 단축 기법으로는 자원 추가 투입(Crashing), 작업 순서를 변경하여 병행 수행(Fast Tracking), 작업 범위 축소 등이 있습니다. 범위 확대는 오히려 일정을 더 지연시킵니다.'
  },
  {
    title: '분석 조직 구조 중 "집중형" 조직은?',
    content: '전사적 분석 업무를 담당하는 별도의 전문 조직을 구성하여 운영하는 형태는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '집중형 (Centralized)',
      '분산형 (Decentralized)',
      '기능형 (Functional)',
      '매트릭스형 (Matrix)'
    ]),
    answer: 0,
    explanation: '집중형 조직은 전사 분석을 전담하는 하나의 부서(예: 분석 CoE)에서 모든 분석 업무를 수행하는 구조입니다.'
  },
  {
    title: '분석 조직 구조 중 "분산형" 조직은?',
    content: '분석 인력이 각 현업 부서에 배치되어 해당 부서의 분석 업무를 직접 수행하는 형태는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '분산형 (Decentralized)',
      '집중형 (Centralized)',
      '기능형 (Functional)',
      '프로젝트형 (Projectized)'
    ]),
    answer: 0,
    explanation: '분산형(또는 기능형) 조직은 분석 인력이 마케팅, 재무 등 각 현업 부서에 소속되어 해당 부서의 업무를 지원하는 구조입니다.'
  },
  {
    title: '분석 조직 구조 중 "기능형" 조직은?',
    content: '분석 조직의 유형 중, 분석 인력이 각 비즈니스 부서에 소속되어 해당 업무를 수행하는 구조는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '기능형 (Functional)',
      '집중형 (Centralized)',
      '분산형 (Decentralized)',
      'CoE (Center of Excellence)'
    ]),
    answer: 0,
    explanation: '기능형 조직은 분석 인력이 각 기능(현업) 부서에 분산 배치되는 구조를 의미합니다. (분산형과 유사한 개념으로 사용됨)'
  },
  {
    title: '분석 조직 구조 중 "CoE" 조직은?',
    content: '집중형 조직과 분산형 조직의 장점을 결합하여, 핵심 분석 전문가는 CoE에 두고 현업과 협업하는 구조는?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      'CoE (Center of Excellence) / 하이브리드형',
      '완전 집중형',
      '완전 분산형',
      '프로젝트형'
    ]),
    answer: 0,
    explanation: 'CoE(분석 전문 센터) 또는 하이브리드형 조직은 전사 분석 전략은 CoE가 담당하고, 현업 분석은 현업 부서와 협력하거나 지원하는 혼합형 구조입니다.'
  },
  {
    title: '빅데이터 분석 방법론의 특징은?',
    content: '전통적인 분석 방법론(CRISP-DM 등)과 비교한 빅데이터 분석 방법론의 특징은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '분석 과정의 반복(Iterative) 및 병렬 처리(Parallel) 강조',
      '엄격한 순차적 단계 적용',
      '소규모 정형 데이터만 처리',
      '업무 이해 단계 생략'
    ]),
    answer: 0,
    explanation: '빅데이터 분석 방법론(예: Agile 방식)은 대용량의 비정형 데이터를 다루므로, 탐색적 분석과 모델링 과정을 여러 번 반복(Iterative)하고, 병렬 처리(Hadoop 등)를 활용하는 것이 특징입니다.'
  },
  {
    title: '분석 과제 발굴을 위한 4가지 유형이 아닌 것은?',
    content: '분석 과제 발굴을 위한 4가지 접근 유형(쿼터)으로 거리가 먼 것은?',
    category: '데이터 분석 기획',
    difficulty: 3,
    options: JSON.stringify([
      '전략 (Strategy)',
      '비즈니스 (Business)',
      '운영 (Operation)',
      '분석 (Analytics)'
    ]),
    answer: 0,
    explanation: '분석 과제 발굴의 4가지 유형은 비즈니스(Business), 운영(Operation), 분석(Analytics), 데이터(Data) 관점에서의 접근입니다. (ADsP 교재 기준)'
  },
  {
    title: '분석가의 역량 중 "Hard Skill"은?',
    content: '데이터 분석가에게 요구되는 역량 중 "Hard Skill"에 해당하는 것은?',
    category: '데이터 분석 기획',
    difficulty: 1,
    options: JSON.stringify([
      '데이터 처리 및 분석 모델링 기술',
      '커뮤니케이션 능력',
      '협업 능력',
      '창의적 사고'
    ]),
    answer: 0,
    explanation: 'Hard Skill은 교육이나 훈련을 통해 습득 가능한 기술적 능력(프로그래밍, 통계, 모델링 등)을 의미합니다. 나머지는 Soft Skill입니다.'
  },
  {
    title: '분석가의 역량 중 "Soft Skill"은?',
    content: '데이터 분석가에게 요구되는 역량 중 "Soft Skill"에 해당하는 것은?',
    category: '데이터 분석 기획',
    difficulty: 1,
    options: JSON.stringify([
      '설득력 있는 커뮤니케이션 능력',
      'R 프로그래밍',
      'SQL 쿼리 작성',
      '머신러닝 알고리즘 구현'
    ]),
    answer: 0,
    explanation: 'Soft Skill은 대인관계, 의사소통, 협업, 문제 해결 등 비기술적, 내면적 역량을 의미합니다.'
  },
  {
    title: '프로토타이핑(Prototyping) 접근법의 장점은?',
    content: '분석 기획 시 프로토타이핑 접근법을 사용하는 주된 이유는?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '요구사항을 조기에 파악하고 검증 가능',
      '최종 시스템을 완벽하게 구축',
      '프로젝트 일정을 단축시킴',
      '데이터 보안을 강화함'
    ]),
    answer: 0,
    explanation: '프로토타이핑은 분석 결과물의 시제품(예: 대시보드 샘플)을 미리 만들어 사용자(현업)의 피드백을 받고 요구사항을 명확히 하는 데 도움을 줍니다.'
  },
  {
    title: '폭포수 모델(Waterfall Model)의 특징은?',
    content: '전통적인 SW 개발 방법론인 폭포수 모델의 특징으로 옳은 것은?',
    category: '데이터 분석 기획',
    difficulty: 2,
    options: JSON.stringify([
      '각 단계가 순차적으로 진행되며 이전 단계로 돌아가기 어려움',
      '반복적인 프로토타입 개발',
      '고객의 요구사항 변경에 유연하게 대처',
      '분석 프로젝트에 가장 적합함'
    ]),
    answer: 0,
    explanation: '폭포수 모델은 요구사항 정의, 설계, 구현, 테스트, 배포의 단계가 명확히 구분되어 순차적으로 진행됩니다. 요구사항이 명확한 경우에 적합하나, 변경에 유연하지 못합니다.'
  },

  // 데이터 분석 (40문제)
  {
    title: '데이터 전처리(Preprocessing)가 아닌 것은?',
    content: '데이터 분석을 위한 데이터 준비 단계에서 수행하는 전처리 활동이 아닌 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '모델 배포 (Deployment)',
      '결측치 처리 (Missing Value Handling)',
      '이상치 탐지 (Outlier Detection)',
      '데이터 변환 (Data Transformation)'
    ]),
    answer: 0,
    explanation: '데이터 전처리는 결측치 처리, 이상치 탐지, 데이터 변환(정규화 등), 파생 변수 생성 등을 포함합니다. 모델 배포는 분석 마지막 단계입니다.'
  },
  {
    title: '결측치 처리 방법이 아닌 것은?',
    content: '데이터에 누락된 값(결측치)을 처리하는 방법으로 적절하지 않은 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '해당 변수(컬럼) 활용',
      '결측치 삭제 (행 또는 열)',
      '평균/중앙값/최빈값 대체',
      '예측 모델을 이용한 대체'
    ]),
    answer: 0,
    explanation: '결측치는 해당 데이터(행)를 삭제하거나, 컬럼 전체를 삭제하거나, 다른 값(평균, 중앙값 등)으로 대체하여 처리해야 합니다. 그대로 활용하면 분석 결과가 왜곡될 수 있습니다.'
  },
  {
    title: '이상치(Outlier)의 정의는?',
    content: '데이터 분포에서 다른 값들과 동떨어진 값을 무엇이라 하는가?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '이상치 (Outlier)',
      '결측치 (Missing Value)',
      '최빈값 (Mode)',
      '평균 (Mean)'
    ]),
    answer: 0,
    explanation: '이상치(Outlier)는 일반적인 데이터의 분포나 패턴에서 크게 벗어난 값을 의미합니다.'
  },
  {
    title: '데이터 변환 중 "정규화(Normalization)"는?',
    content: '데이터의 범위를 0과 1 사이로 변환하는 스케일링 기법은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '최소-최대 정규화 (Min-Max Normalization)',
      'Z-점수 표준화 (Z-score Standardization)',
      '로그 변환 (Log Transformation)',
      '범주화 (Categorization)'
    ]),
    answer: 0,
    explanation: '최소-최대 정규화(Min-Max Scaling)는 (X - min) / (max - min) 공식을 사용하여 모든 데이터를 0과 1 사이의 값으로 변환합니다.'
  },
  {
    title: '데이터 변환 중 "표준화(Standardization)"는?',
    content: '데이터를 평균 0, 표준편차 1인 분포로 변환하는 스케일링 기법은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      'Z-점수 표준화 (Z-score Standardization)',
      '최소-최대 정규화 (Min-Max Normalization)',
      '로그 변환 (Log Transformation)',
      '원-핫 인코딩 (One-Hot Encoding)'
    ]),
    answer: 0,
    explanation: 'Z-점수 표준화는 (X - mean) / std_dev 공식을 사용하여 데이터의 분포를 평균 0, 표준편차 1로 변환합니다.'
  },
  {
    title: '파생 변수(Derived Variable) 생성의 예시는?',
    content: '기존 변수를 조합하여 새로운 변수를 만드는 파생 변수 생성의 예시로 적절한 것은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '키와 몸무게로 BMI 지수 계산',
      '나이 결측치를 평균 나이로 대체',
      '성별 데이터를 숫자로 변환 (남:0, 여:1)',
      '월 소득 데이터 표준화'
    ]),
    answer: 0,
    explanation: '파생 변수는 기존 변수(키, 몸무게)를 활용하여 새로운 의미를 갖는 변수(BMI)를 만드는 것입니다.'
  },
  {
    title: '범주형 데이터를 수치형으로 변환하는 기법이 아닌 것은?',
    content: '머신러닝 모델링을 위해 범주형 변수(예: 혈액형 A, B, O)를 수치형으로 변환하는 기법이 아닌 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '로그 변환 (Log Transformation)',
      '레이블 인코딩 (Label Encoding)',
      '원-핫 인코딩 (One-Hot Encoding)',
      '더미 변수화 (Dummy Variables)'
    ]),
    answer: 0,
    explanation: '레이블 인코딩(A=0, B=1, O=2)과 원-핫 인코딩(A=[1,0,0], B=[0,1,0], O=[0,0,1])은 범주형 데이터를 수치형으로 변환합니다. 로그 변환은 연속형(수치형) 데이터에 적용합니다.'
  },
  {
    title: '원-핫 인코딩(One-Hot Encoding)의 특징은?',
    content: '범주형 변수를 0과 1로만 구성된 여러 개의 더미 변수로 변환하는 기법은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '원-핫 인코딩',
      '레이블 인코딩',
      'Z-점수 표준화',
      '최소-최대 정규화'
    ]),
    answer: 0,
    explanation: '원-핫 인코딩은 각 범주(A, B, O)를 별도의 컬럼으로 만들고, 해당하는 범주에만 1을, 나머지는 0을 부여하는 방식입니다.'
  },
  {
    title: '기술 통계(Descriptive Statistics)가 아닌 것은?',
    content: '데이터의 특성을 요약하고 설명하는 기술 통계량에 해당하지 않는 것은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'p-value (유의확률)',
      '평균 (Mean)',
      '중앙값 (Median)',
      '표준편차 (Standard Deviation)'
    ]),
    answer: 0,
    explanation: '평균, 중앙값, 표준편차 등은 데이터의 중심 경향과 산포도를 나타내는 기술 통계량입니다. p-value는 가설 검정(추론 통계)에 사용됩니다.'
  },
  {
    title: '데이터의 중심 경향을 나타내는 값이 아닌 것은?',
    content: '데이터가 어디에 집중되어 있는지를 나타내는 중심 경향치로 거리가 먼 것은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '범위 (Range)',
      '평균 (Mean)',
      '중앙값 (Median)',
      '최빈값 (Mode)'
    ]),
    answer: 0,
    explanation: '평균, 중앙값, 최빈값은 데이터의 중심 위치를 나타냅니다. 범위(최대값-최소값)는 데이터의 산포도(흩어진 정도)를 나타냅니다.'
  },
  {
    title: '이상치(Outlier)에 민감한 중심 경향치는?',
    content: '데이터의 중심 경향치 중 극단적인 값(이상치)의 영향을 가장 많이 받는 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '평균 (Mean)',
      '중앙값 (Median)',
      '최빈값 (Mode)',
      '사분위수 (Quartile)'
    ]),
    answer: 0,
    explanation: '평균은 모든 데이터 값을 더하여 나누기 때문에, 매우 크거나 작은 이상치에 의해 값이 크게 왜곡될 수 있습니다. 중앙값은 이상치에 덜 민감합니다(로버스트하다).'
  },
  {
    title: '데이터의 산포도를 나타내는 값이 아닌 것은?',
    content: '데이터가 흩어진 정도(산포도)를 나타내는 측도가 아닌 것은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '평균 (Mean)',
      '분산 (Variance)',
      '표준편차 (Standard Deviation)',
      '범위 (Range)'
    ]),
    answer: 0,
    explanation: '분산, 표준편차, 범위, 사분위수 범위(IQR) 등은 데이터의 흩어진 정도를 나타냅니다. 평균은 중심 경향치입니다.'
  },
  {
    title: '분산(Variance)의 정의는?',
    content: '데이터가 평균으로부터 얼마나 떨어져 있는지(편차)를 제곱하여 평균 낸 값은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '분산 (Variance)',
      '표준편차 (Standard Deviation)',
      '중앙값 (Median)',
      '범위 (Range)'
    ]),
    answer: 0,
    explanation: '분산은 각 데이터 값이 평균에서 얼마나 떨어져 있는지를(편차) 제곱한 값들의 평균입니다. 데이터의 흩어진 정도를 나타냅니다.'
  },
  {
    title: '표준편차(Standard Deviation)의 정의는?',
    content: '분산(Variance)에 제곱근을 취한 값으로, 원래 데이터와 동일한 단위를 갖는 산포도 측도는?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '표준편차 (Standard Deviation)',
      '분산 (Variance)',
      '평균 (Mean)',
      '사분위수 범위 (IQR)'
    ]),
    answer: 0,
    explanation: '표준편차는 분산의 양의 제곱근입니다. 분산은 단위를 제곱하기 때문에 해석이 어려워, 표준편차를 주로 사용합니다.'
  },
  {
    title: 'R에서 데이터 프레임 생성 함수는?',
    content: 'R 언어에서 행과 열로 구성된 테이블 형태의 데이터 구조(데이터 프레임)를 생성하는 함수는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'data.frame()',
      'list()',
      'c()',
      'matrix()'
    ]),
    answer: 0,
    explanation: '`data.frame()` 함수는 R에서 가장 많이 사용되는 데이터 구조인 데이터 프레임을 생성합니다.'
  },
  {
    title: 'R에서 결측치를 확인하는 함수는?',
    content: 'R 언어에서 데이터에 결측치(NA)가 있는지 확인하는 함수는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'is.na()',
      'mean()',
      'summary()',
      'is.null()'
    ]),
    answer: 0,
    explanation: '`is.na()` 함수는 데이터의 각 요소가 결측치(NA)인지 여부를 TRUE/FALSE로 반환합니다.'
  },
  {
    title: 'R에서 기술 통계 요약 함수는?',
    content: 'R 언어에서 데이터 프레임의 각 변수에 대한 기술 통계량(평균, 중앙값, 사분위수, 최소/최대값)을 요약하여 보여주는 함수는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'summary()',
      'head()',
      'str()',
      'dim()'
    ]),
    answer: 0,
    explanation: '`summary()` 함수는 데이터의 구조에 따라(숫자형, 범주형) 적절한 기술 통계 요약 정보를 제공합니다.'
  },
  {
    title: 'R에서 데이터 구조 확인 함수는?',
    content: 'R 언어에서 데이터의 구조(관측치 수, 변수 수, 변수 타입 등)를 확인하는 함수는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'str()',
      'summary()',
      'head()',
      'mean()'
    ]),
    answer: 0,
    explanation: '`str()` (structure) 함수는 데이터 객체의 구조를 간결하게 요약하여 보여줍니다.'
  },
  {
    title: 'SQL에서 데이터 조회를 위한 명령어는?',
    content: 'SQL(Structured Query Language)에서 테이블의 데이터를 조회(선택)하기 위한 명령어는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'SELECT',
      'INSERT',
      'UPDATE',
      'DELETE'
    ]),
    answer: 0,
    explanation: 'SELECT 문은 데이터베이스 테이블에서 원하는 데이터를 조회(추출)할 때 사용합니다.'
  },
  {
    title: 'SQL에서 데이터 삽입을 위한 명령어는?',
    content: 'SQL에서 테이블에 새로운 행(데이터)을 삽입하기 위한 명령어는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'INSERT',
      'SELECT',
      'UPDATE',
      'DELETE'
    ]),
    answer: 0,
    explanation: 'INSERT INTO ... VALUES ... 구문은 테이블에 새로운 데이터를 삽입할 때 사용합니다.'
  },
  {
    title: 'SQL에서 데이터 수정을 위한 명령어는?',
    content: 'SQL에서 테이블의 기존 데이터를 수정하기 위한 명령어는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'UPDATE',
      'SELECT',
      'INSERT',
      'DELETE'
    ]),
    answer: 0,
    explanation: 'UPDATE ... SET ... WHERE ... 구문은 특정 조건의 데이터를 새로운 값으로 수정할 때 사용합니다.'
  },
  {
    title: 'SQL에서 데이터 삭제를 위한 명령어는?',
    content: 'SQL에서 테이블의 데이터를 삭제하기 위한 명령어는?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'DELETE',
      'SELECT',
      'INSERT',
      'UPDATE'
    ]),
    answer: 0,
    explanation: 'DELETE FROM ... WHERE ... 구문은 특정 조건의 데이터를 삭제할 때 사용합니다.'
  },
  {
    title: 'SQL에서 조건을 지정하는 절은?',
    content: 'SQL의 SELECT, UPDATE, DELETE 문에서 특정 조건을 지정하는 절은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'WHERE',
      'FROM',
      'GROUP BY',
      'ORDER BY'
    ]),
    answer: 0,
    explanation: 'WHERE 절은 데이터를 조회, 수정, 삭제할 대상을 특정 조건으로 한정할 때 사용합니다.'
  },
  {
    title: 'SQL에서 그룹별 집계를 위한 절은?',
    content: 'SQL에서 특정 컬럼을 기준으로 데이터를 그룹화하고, 각 그룹에 대한 집계 함수(예: COUNT, SUM)를 적용하는 절은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      'GROUP BY',
      'WHERE',
      'ORDER BY',
      'JOIN'
    ]),
    answer: 0,
    explanation: 'GROUP BY 절은 데이터를 특정 그룹으로 묶어(예: 부서별) 통계(예: 부서별 평균 급여)를 계산할 때 사용합니다.'
  },
  {
    title: 'SQL에서 정렬을 위한 절은?',
    content: 'SQL에서 조회 결과를 특정 컬럼 기준으로 정렬(오름차순/내림차순)하는 절은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      'ORDER BY',
      'WHERE',
      'GROUP BY',
      'SELECT'
    ]),
    answer: 0,
    explanation: 'ORDER BY 절은 결과 데이터를 정렬할 때 사용하며, ASC(오름차순, 기본값) 또는 DESC(내림차순)를 지정할 수 있습니다.'
  },
  {
    title: 'SQL에서 테이블을 결합하는 명령어는?',
    content: 'SQL에서 두 개 이상의 테이블을 공통된 컬럼을 기준으로 결합(연결)하는 명령어는?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      'JOIN',
      'UNION',
      'GROUP BY',
      'MERGE'
    ]),
    answer: 0,
    explanation: 'JOIN(INNER JOIN, LEFT JOIN 등)은 관계형 데이터베이스에서 여러 테이블에 분산된 데이터를 연결하여 조회할 때 사용합니다.'
  },
  {
    title: '데이터 시각화 기법 중 "히스토그램"은?',
    content: '연속형 데이터의 분포(빈도)를 막대 그래프 형태로 나타내는 시각화 기법은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '히스토그램 (Histogram)',
      '막대 그래프 (Bar Chart)',
      '선 그래프 (Line Chart)',
      '산점도 (Scatter Plot)'
    ]),
    answer: 0,
    explanation: '히스토그램은 데이터의 구간(bin)별 빈도수를 막대로 표현하여 데이터의 전체적인 분포 형태(정규분포, 치우침 등)를 파악하는 데 사용됩니다.'
  },
  {
    title: '데이터 시각화 기법 중 "막대 그래프"는?',
    content: '범주형 데이터의 항목별 크기(빈도, 합계 등)를 비교하기 위해 막대 길이로 나타내는 시각화 기법은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '막대 그래프 (Bar Chart)',
      '히스토그램 (Histogram)',
      '원 그래프 (Pie Chart)',
      '산점도 (Scatter Plot)'
    ]),
    answer: 0,
    explanation: '막대 그래프는 범주형 데이터(예: 혈액형별 인원수)의 값을 비교하는 데 적합합니다.'
  },
  {
    title: '데이터 시각화 기법 중 "산점도"는?',
    content: '두 연속형 변수 간의 관계(상관관계)를 파악하기 위해 점으로 나타내는 시각화 기법은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '산점도 (Scatter Plot)',
      '막대 그래프 (Bar Chart)',
      '선 그래프 (Line Chart)',
      '박스 플롯 (Box Plot)'
    ]),
    answer: 0,
    explanation: '산점도(산포도)는 X축과 Y축에 해당하는 두 변수의 관계를 점으로 표시하여 양의 상관관계, 음의 상관관계, 무상관 등을 시각적으로 확인하는 데 사용됩니다.'
  },
  {
    title: '데이터 시각화 기법 중 "박스 플롯"은?',
    content: '데이터의 사분위수(중앙값, 1사분위, 3사분위)와 최소/최대값, 이상치를 상자 그림으로 나타내는 시각화 기법은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '박스 플롯 (Box Plot)',
      '히스토그램 (Histogram)',
      '산점도 (Scatter Plot)',
      '원 그래프 (Pie Chart)'
    ]),
    answer: 0,
    explanation: '박스 플롯(상자 수염 그림)은 데이터의 분포와 이상치를 간결하게 요약하여 보여주며, 여러 그룹 간의 분포를 비교하는 데 유용합니다.'
  },
  {
    title: '데이터 시각화 기법 중 "선 그래프"는?',
    content: '시간의 흐름에 따른 데이터의 변화 추세를 파악하는 데 가장 적합한 시각화 기법은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '선 그래프 (Line Chart)',
      '막대 그래프 (Bar Chart)',
      '산점도 (Scatter Plot)',
      '원 그래프 (Pie Chart)'
    ]),
    answer: 0,
    explanation: '선 그래프는 X축에 시간(연도, 월, 일)을 두고 Y축에 값을 두어, 시간 경과에 따른 데이터의 변화 추세(증가, 감소, 주기성)를 보여주는 데 적합합니다.'
  },
  {
    title: '지도학습(Supervised Learning)의 예시는?',
    content: '다음 머신러닝 기법 중 지도학습에 해당하는 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '회귀 분석 (Regression)',
      '군집 분석 (Clustering)',
      '연관 분석 (Association Rule)',
      '차원 축소 (Dimensionality Reduction)'
    ]),
    answer: 0,
    explanation: '지도학습은 정답(레이블)이 있는 데이터를 학습하는 방식입니다. 회귀(연속형 예측)와 분류(범주형 예측)가 대표적인 지도학습입니다. 군집, 연관 분석은 비지도학습입니다.'
  },
  {
    title: '비지도학습(Unsupervised Learning)의 예시는?',
    content: '다음 머신러닝 기법 중 비지도학습에 해당하는 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '군집 분석 (Clustering)',
      '분류 (Classification)',
      '회귀 (Regression)',
      '딥러닝 (Deep Learning)'
    ]),
    answer: 0,
    explanation: '비지도학습은 정답(레이블)이 없는 데이터를 학습하여 데이터 내의 구조나 패턴을 찾는 방식입니다. 군집 분석, 연관 분석, 차원 축소(PCA) 등이 해당합니다.'
  },
  {
    title: '분류(Classification) 모델이 아닌 것은?',
    content: '데이터를 특정 범주(클래스)로 예측하는 분류 모델에 해당하지 않는 것은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      'K-평균 군집화 (K-Means Clustering)',
      '의사결정나무 (Decision Tree)',
      '로지스틱 회귀 (Logistic Regression)',
      '서포트 벡터 머신 (SVM)'
    ]),
    answer: 0,
    explanation: '의사결정나무, 로지스틱 회귀, SVM 등은 대표적인 분류 알고리즘입니다. K-평균 군집화는 비지도학습인 군집 분석 알고리즘입니다.'
  },
  {
    title: '회귀(Regression) 모델은?',
    content: '연속적인 숫자 값을 예측(예: 주택 가격 예측)하는 데 사용되는 머신러닝 기법은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '선형 회귀 (Linear Regression)',
      '로지스틱 회귀 (Logistic Regression)',
      'K-최근접 이웃 (K-Nearest Neighbors)',
      '군집 분석 (Clustering)'
    ]),
    answer: 0,
    explanation: '선형 회귀는 독립 변수와 종속 변수 간의 선형 관계를 모델링하여 연속적인 값을 예측하는 대표적인 회귀 기법입니다. (로지스틱 회귀는 이름과 달리 분류 기법입니다.)'
  },
  {
    title: '군집 분석(Clustering)은?',
    content: '데이터 간의 유사도를 기반으로 비슷한 특성을 가진 데이터끼리 그룹화하는 비지도학습 기법은?',
    category: '데이터 분석',
    difficulty: 1,
    options: JSON.stringify([
      '군집 분석',
      '분류 분석',
      '회귀 분석',
      '연관 분석'
    ]),
    answer: 0,
    explanation: '군집 분석은 정답(레이블) 없이 데이터의 유사성을 측정하여 여러 개의 군집(클러스터)으로 나누는 기법입니다. (예: 고객 세분화)'
  },
  {
    title: '연관 분석(Association Rule)은?',
    content: '데이터 항목 간의 관계(예: "기저귀를 산 사람이 맥주도 산다")를 탐색하는 비지도학습 기법은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '연관 분석',
      '군집 분석',
      '분류 분석',
      '회귀 분석'
    ]),
    answer: 0,
    explanation: '연관 분석(장바구니 분석)은 트랜잭션 데이터에서 항목 간의 빈번한 발생 패턴(연관 규칙)을 찾는 기법입니다.'
  },
  {
    title: '연관 분석의 평가 척도가 아닌 것은?',
    content: '연관 분석(A -> B)의 규칙을 평가하는 척도로 거리가 먼 것은?',
    category: '데이터 분석',
    difficulty: 3,
    options: JSON.stringify([
      '정확도 (Accuracy)',
      '지지도 (Support)',
      '신뢰도 (Confidence)',
      '향상도 (Lift)'
    ]),
    answer: 0,
    explanation: '연관 분석은 지지도(A와 B가 동시에 발생할 확률), 신뢰도(A가 발생했을 때 B가 발생할 확률), 향상도(A와 B의 관계가 우연인지)로 규칙을 평가합니다. 정확도는 분류 모델의 평가 척도입니다.'
  },
  {
    title: '모델 평가: 과적합(Overfitting)이란?',
    content: '머신러닝 모델이 학습 데이터(Train Data)에만 과도하게 최적화되어, 새로운 데이터(Test Data)에 대한 예측 성능이 낮아지는 현상은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '과적합 (Overfitting)',
      '과소적합 (Underfitting)',
      '정규화 (Regularization)',
      '교차 검증 (Cross Validation)'
    ]),
    answer: 0,
    explanation: '과적합(과대적합)은 모델이 학습 데이터의 노이즈까지 학습하여 일반화 성능이 떨어지는 현상입니다. 학습 데이터 성능은 좋지만 테스트 데이터 성능이 나쁩니다.'
  },
  {
    title: '모델 평가: 과소적합(Underfitting)이란?',
    content: '머신러닝 모델이 너무 단순하여 학습 데이터의 패턴조차 제대로 학습하지 못하는 현상은?',
    category: '데이터 분석',
    difficulty: 2,
    options: JSON.stringify([
      '과소적합 (Underfitting)',
      '과적합 (Overfitting)',
      '데이터 누수 (Data Leakage)',
      '차원의 저주 (Curse of Dimensionality)'
    ]),
    answer: 0,
    explanation: '과소적합은 모델이 데이터의 복잡성을 충분히 반영하지 못하여 학습 데이터와 테스트 데이터 모두에서 성능이 낮은 현상입니다.'
  }
]

async function main() {
  console.log('ADsP 시드 데이터 생성 시작...')

  // 기존 데이터 삭제
  await prisma.question.deleteMany()
  console.log('기존 데이터 삭제 완료')

  // 100개 문제 생성
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    await prisma.question.create({
      data: {
        // title에 별도 번호 부여 (필요시 사용, 현재는 원본 title 사용)
        // title: `${q.title} [${i + 1}]`,
        title: q.title,
        content: q.content,
        category: q.category,
        difficulty: q.difficulty,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      }
    })

    if ((i + 1) % 10 === 0) {
      console.log(`✅ ${i + 1}개 문제 생성 완료...`)
    }
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
