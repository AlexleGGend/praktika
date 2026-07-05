from app.core.clients import es
def create_index():
    index_name = "documents"
    if not es.indices.exists(index=index_name):
        es.indices.create(
            index=index_name,
            body={
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "russian": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "filter": [
                                    "lowercase",
                                    "russian_stop",
                                    "russian_stemmer"
                                ]
                            }
                        },
                        "filter": {
                            "russian_stop": {
                                "type": "stop",
                                "stopwords": "_russian_"
                            },
                            "russian_stemmer": {
                                "type": "stemmer",
                                "language": "russian"
                            }
                        }
                    }
                },
                "mappings": {
                    "properties": {
                        "file_name": {
                            "type": "text"
                        },
                        "text": {
                            "type": "text",
                            "analyzer": "russian"
                        },
                        "chunk_id": {
                            "type": "keyword"
                        },
                        "page_number": {
                            "type": "integer"
                        }
                    }
                }
            }
        )