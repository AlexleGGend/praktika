#!/bin/bash
echo "📚 Загрузка тестовых документов..."
mkdir -p test_docs

URLS=(
    "https://arxiv.org/pdf/2101.00101.pdf"
    "https://arxiv.org/pdf/2006.12345.pdf"
    "https://arxiv.org/pdf/1905.12345.pdf"
    "https://arxiv.org/pdf/1806.12345.pdf"
    "https://arxiv.org/pdf/1706.12345.pdf"
)

for i in "${!URLS[@]}"; do
    echo "Скачивание документа $((i+1))..."
    curl -L "${URLS[$i]}" -o "test_docs/document_$((i+1)).pdf"
done

for file in test_docs/*.pdf; do
    echo "Загрузка $file..."
    curl -X POST http://localhost:8000/api/v1/documents/upload \
        -F "files=@$file"
    echo ""
    sleep 1
done

echo "✅ Тестовые документы загружены!"