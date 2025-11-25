from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from src.helper import dowload_huggingface_embeddings
from langchain_pinecone import Pinecone as PineconeVectorStore
from langchain_openai import OpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from src.prompt import *
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

embeddings = dowload_huggingface_embeddings()

index_name = "medicalbot"

docsearch = PineconeVectorStore.from_existing_index(
    embedding=embeddings,
    index_name=index_name
)

retriever = docsearch.as_retriever(search_type='similarity', search_kwargs={'k': 4})

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash",temperature=0.4, max_tokens=500)
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever,question_answer_chain)

@app.route("/get", methods=["GET", "POST"])
def chat():
    data = request.get_json()
    msg = data.get("message")
    response = rag_chain.invoke({"input":msg})
    print(response)
    return jsonify({"answer": response["answer"]})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
