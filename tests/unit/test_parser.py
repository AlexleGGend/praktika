import pytest
import sys
sys.path.append('.')

def test_example():
    assert True

def test_split_into_chunks():
    from backend.app.services.parser import split_into_chunks
    text = "A" * 2500
    chunks = split_into_chunks(text, chunk_size=1000, overlap=100)
    assert len(chunks) == 3
    assert chunks[0] == "A" * 1000
    assert len(chunks[1]) == 1000
    assert chunks[2] == "A" * 500

def test_split_into_chunks_empty():
    from backend.app.services.parser import split_into_chunks
    chunks = split_into_chunks("")
    assert chunks == []

def test_split_into_chunks_small():
    from backend.app.services.parser import split_into_chunks
    text = "Hello world"
    chunks = split_into_chunks(text, chunk_size=1000, overlap=100)
    assert chunks == ["Hello world"]