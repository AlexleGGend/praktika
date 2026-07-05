import React from "react";
import "./DocumentList.css";

interface Document {
  id: string;
  filename: string;
  status: "uploading" | "indexing" | "ready" | "error";
  uploadDate?: string;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="document-list">
      <h2>📄 Загруженные документы</h2>
      <div className="document-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <div className="document-icon">📄</div>
            <div className="document-info">
              <div className="document-name">{doc.filename}</div>
              <div className="document-status">
                <span className={`status-badge status-${doc.status}`}>
                  {doc.status === "uploading" && "⏳ Загрузка..."}
                  {doc.status === "indexing" && "🔄 Индексация..."}
                  {doc.status === "ready" && "✅ Готово"}
                  {doc.status === "error" && "❌ Ошибка"}
                </span>
                {doc.uploadDate && (
                  <span className="document-date">{doc.uploadDate}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
