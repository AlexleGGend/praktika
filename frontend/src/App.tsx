import React, { useState } from 'react'
import UploadZone from './components/UploadZone'
import DocumentList from './components/DocumentList'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

interface Document {
  id: string
  filename: string
  status: 'uploading' | 'indexing' | 'ready' | 'error'
  uploadDate?: string
}

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleUpload = (files: File[]) => {
    const newDocs: Document[] = files.map(file => ({
      id: Date.now().toString() + Math.random(),
      filename: file.name,
      status: 'uploading'
    }))
    setDocuments(prev => [...prev, ...newDocs])
  }

  const handleSearch = (results: any[]) => {
    setSearchResults(results)
  }

  return (
    <div className="container">
      <h1>📚 Поиск по документам университета</h1>

      <UploadZone onUpload={handleUpload} />

      <DocumentList documents={documents} />

      <SearchBar onSearch={handleSearch} setIsSearching={setIsSearching} setQuery={setSearchQuery} />

      <SearchResults results={searchResults} isSearching={isSearching} query={searchQuery} />
    </div>
  )
}

export default App