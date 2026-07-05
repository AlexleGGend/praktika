import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./UploadZone.css";

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    onUpload(acceptedFiles);
    setUploading(true);

    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('file', file)
    });

    try {
      await axios.post('http://localhost:8000/api/v1/documents/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          acceptedFiles.forEach(file => {
            setProgress(prev => ({ ...prev, [file.name]: percent }));
          });
        }
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Ошибка загрузки файлов. Проверьте формат (PDF/DOCX) и размер (до 20 МБ)");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress({}), 3000);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    },
    maxSize: 20 * 1024 * 1024,
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""} ${uploading ? "uploading" : ""}`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="upload-progress">
          <p>⏳ Загрузка файлов...</p>
          {Object.entries(progress).map(([name, percent]) => (
            <div key={name} className="progress-item">
              <span>{name}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <span>{percent}%</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="dropzone-content">
          <div className="dropzone-icon">📤</div>
          {isDragActive ? (
            <p>Отпустите файлы для загрузки...</p>
          ) : (
            <>
              <p><strong>Перетащите файлы сюда</strong></p>
              <p>или кликните для выбора</p>
              <p className="dropzone-hint">Поддерживаются PDF и DOCX (до 20 МБ)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadZone;





