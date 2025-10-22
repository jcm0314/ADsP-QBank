import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          ADsP 문제은행
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          데이터분석 준전문가 자격시험 대비 문제풀이
        </p>
        
        <Link
          href="/solve"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🎲 문제 풀기 시작
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">100</h3>
            <p className="text-gray-600">문제</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">5</h3>
            <p className="text-gray-600">카테고리</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">∞</h3>
            <p className="text-gray-600">무제한 학습</p>
          </div>
        </div>
      </div>
    </main>
  )
}
