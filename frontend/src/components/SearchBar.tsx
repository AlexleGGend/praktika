import React, { useState } from 'react'
import axios from 'axios'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (results: any[]) => void
  setIsSearching: (value: boolean) => void
  setQuery: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, setIsSearching, setQuery }) => {
  const [query, setQueryLocal] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      onSearch([])
      return
    }

    setLoading(true)
    setIsSearching(true)
    setQuery(query)

    try {
      const response = await axios.get('http://localhost:8000/api/v1/search', {
        params: { q: query, page: 1, size: 10 }
      })
      onSearch(response.data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert('Ошибка поиска: ' + error.response.data.detail)
      } else {
        alert('Ошибка при выполнении поиска')
      }
      onSearch([])
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQueryLocal(value)
    setQuery(value)
  }

  return (
    <div className="search-container">
      <h2>🔍 Поиск по документам</h2>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onKeyPress={handleKeyPress}
          placeholder="Введите поисковый запрос..."
          className="search-input"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? '⏳ Поиск...' : 'Найти'}
        </button>
      </div>
    </div>
  )
}

export default SearchBar