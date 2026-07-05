import pdfplumber
from io import BytesIO
from docx import Document
def extract_text_from_pdf(file_bytes: bytes):
    text = []
    pages = []
    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            page_text = page.extract_text() or ""
            text.append(page_text)
            pages.append({"page_number": page_number, "text": page_text})
    return "\n".join(text), pages
def extract_text_from_docx(file_bytes: bytes) -> str:
    doc = Document(BytesIO(file_bytes))
    text = []
    for paragraph in doc.paragraphs:
        if paragraph.text:
            text.append(paragraph.text)
    return "\n".join(text)
def extract_text(filename: str, file_bytes: bytes):
    filename = filename.lower()
    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)
    if filename.endswith(".docx"):
        text = extract_text_from_docx(file_bytes)
        return text, None
    raise ValueError("Unsupported file format")
def split_into_chunks(text: str, chunk_size: int = 1000, overlap: int = 100):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks