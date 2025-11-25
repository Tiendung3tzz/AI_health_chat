from src.helper import load_pdf_file, text_split
from langchain_huggingface import HuggingFaceEmbeddings
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from langchain_pinecone import Pinecone as PineconeStore
from dotenv import load_dotenv
import os

load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY

extracted_data = load_pdf_file(data='Data/')
text_chunks = text_split(extracted_data)


embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
# embeddings = dowload_huggingface_embeddings()

pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "medicalbot"

if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )



docsearch = PineconeStore.from_documents(
    documents=text_chunks,
    embedding=embeddings,
    index_name=index_name
)