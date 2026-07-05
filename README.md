# Интеллектуальная поисковая система университета

## 📋 Описание
Веб-приложение для полнотекстового поиска по загруженным документам (PDF, DOCX) с использованием Elasticsearch.

## 🛠️ Технологии
- **Backend**: Python, FastAPI, Elasticsearch, Redis, PostgreSQL
- **Frontend**: React, TypeScript, Vite
- **DevOps**: Docker, Docker Compose, Prometheus, Grafana

## 🚀 Быстрый старт

### 1. Настройка окружения
```
cp .env.example .env
```

### 2. Запуск всех сервисов
```
docker-compose up -d
```

### 3. Доступ к сервисам
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **Swagger**: http://localhost:8000/docs
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)

### 4. Загрузка тестовых документов
```
chmod +x init.sh
./init.sh
```

## 👥 Команда
- **Backend & DevOps**: [Имя напарника]
- **Frontend & QA**: [Твое имя]