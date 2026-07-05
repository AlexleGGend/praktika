from uuid import uuid4
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.clients import es
from app.services.parser import extract_text, split_into_chunks

router = APIRouter(prefix="/api/v1/documents", tags=["documents"])

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    filename = file.filename.lower()

    if not (filename.endswith(".pdf") or filename.endswith(".docx")):
        raise HTTPException(status_code=400, detail="Invalid format. PDF or DOCX.")

    contents = await file.read()

    if len(contents) > 20 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max size - 20 MB.")

    document_id = str(uuid4())

    text, pages = extract_text(file.filename, contents)

    if pages is not None:
        chunk_counter = 0

        for page in pages:
            chunks = split_into_chunks(page["text"])

            for chunk in chunks:
                es.index(index="documents", document={
                    "file_name": file.filename,
                    "page_number": page["page_number"],
                    "chunk_id": f"{document_id}_{chunk_counter}",
                    "text": chunk
                })
                chunk_counter += 1
    else:
        chunks = split_into_chunks(text)

        for i, chunk in enumerate(chunks):
            es.index(index="documents", document={
                "file_name": file.filename,
                "page_number": None,
                "chunk_id": f"{document_id}_{i}",
                "text": chunk
            })

    return {"id": document_id, "filename": file.filename, "status": "received"}
