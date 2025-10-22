export interface Question {
  id: string
  title: string
  content: string
  category: string
  difficulty: 1 | 2 | 3
  options: string[]
  answer: number
  explanation?: string
  createdAt: Date
  updatedAt: Date
}

export interface QuestionCreateInput {
  title: string
  content: string
  category: string
  difficulty: 1 | 2 | 3
  options: string[]
  answer: number
  explanation?: string
}
