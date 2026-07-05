import React from 'react'
import './SearchResults.css'

interface SearchResult {
  chunk_id: string
  file_name: string
  page: number | null
  text: string
  score: number
}

interface SearchResultsProps {
  results: SearchResult[]
  isSearching: boolean
  query: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isSearching, query }) => {
  if (isSearching) {
    return (
      <div className="search-results">
        <div className="loading-spinner">⏳ Выполняется поиск...</div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <p>📭 По вашему запросу ничего не найдено.</p>
          <p className="no-results-hint">Попробуйте изменить формулировку</p>
        </div>
      </div>
    )
  }

  // ПОЛНОЕ УДАЛЕНИЕ ДУБЛИКАТОВ по тексту
  const uniqueResults = results.filter((result, index, self) => {
    const text = result.text.trim()
    // Проверяем, был ли уже такой текст
    const firstIndex = self.findIndex(r => r.text.trim() === text)
    return firstIndex === index
  })

  const highlightMatches = (text: string, q: string) => {
    if (!q || !q.trim()) return text

    const words = q.split(/\s+/).filter(w => w.length > 1)
    if (words.length === 0) return text

    const pattern = new RegExp(`(${words.join('|')})`, 'gi')

    return text.split(pattern).map((part, index) => {
      if (words.some(word => word.toLowerCase() === part.toLowerCase())) {
        return <span key={index} className="highlight">{part}</span>
      }
      return part
    })
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <h2>📊 Результаты поиска</h2>
        <span className="results-count">Найдено: {uniqueResults.length}</span>
      </div>

      <div className="results-grid">
        {uniqueResults.map((result, idx) => (
          <div key={`${result.chunk_id}_${idx}`} className="result-card">
            <div className="result-header">
              <span className="result-filename">📄 {result.file_name}</span>
              <span className="result-score">⭐ {result.score?.toFixed(2) || 'N/A'}</span>
            </div>

            {result.page && (
              <div className="result-page">Страница: {result.page}</div>
            )}

            <div className="result-text">
              {highlightMatches(result.text, query)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults