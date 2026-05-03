from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("AI Model Loading...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("AI Model Loaded Successfully!")

# 1. Text File එකෙන් දත්ත කියවීම
knowledge_base = []
file_path = "data.txt"

if os.path.exists(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        # හිස් පේළි අයින් කරලා ලැයිස්තුවකට ගන්නවා
        knowledge_base = [line.strip() for line in file if line.strip()]
    print(f"දත්ත {len(knowledge_base)} ක් සාර්ථකව කියවන ලදී!")
else:
    print("data.txt ෆයිල් එක හොයාගන්න නෑ! කරුණාකර එය සාදන්න.")
    knowledge_base = ["දත්ත ගබඩාව හිස්."]

# 2. දත්ත ටික AI Vectors බවට පත් කිරීම
doc_embeddings = model.encode(knowledge_base)

@app.get("/search")
async def search_knowledge(q: str):
    query_embedding = model.encode([q])
    
    similarities = cosine_similarity(query_embedding, doc_embeddings)[0]
    best_match_index = np.argmax(similarities)
    best_score = float(similarities[best_match_index])
    
    if best_score > 0.3:
        return {"answer": knowledge_base[best_match_index], "score": best_score}
    else:
        return {"answer": "සමාවෙන්න, ඒ ගැන විස්තරයක් මට හොයාගන්න බැරි වුණා. වෙනත් වචන වලින් උත්සාහ කරන්න.", "score": best_score}