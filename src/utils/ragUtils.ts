import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Document } from "@langchain/core/documents";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Initialize embeddings model
const initializeEmbeddings = (apiKey: string) => {
  return new MistralAIEmbeddings({
    apiKey,
    model: "mistral-embed"
  });
};

// Split text into chunks
const splitText = async (text: string): Promise<Document[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  
  return await splitter.createDocuments([text]);
};

// Create vector store from documents
const createVectorStore = async (documents: Document[], embeddings: MistralAIEmbeddings): Promise<MemoryVectorStore> => {
  return await MemoryVectorStore.fromDocuments(documents, embeddings);
};

// Search for similar documents
export const searchSimilarDocuments = async (
  query: string, 
  text: string, 
  apiKey: string
): Promise<Document[]> => {
  try {
    const embeddings = initializeEmbeddings(apiKey);
    const documents = await splitText(text);
    const vectorStore = await createVectorStore(documents, embeddings);
    
    // Search for similar documents
    return await vectorStore.similaritySearch(query, 3);
  } catch (error) {
    console.error("Error in RAG search:", error);
    return [];
  }
};

// Format search results for display
export const formatSearchResults = (results: Document[]): string => {
  if (results.length === 0) {
    return "No relevant information found.";
  }
  
  return results.map((doc, index) => {
    return `### Result ${index + 1}\n${doc.pageContent}\n`;
  }).join("\n");
};

// Main RAG function
export const performRAG = async (
  query: string,
  context: string,
  apiKey: string
): Promise<string> => {
  try {
    const results = await searchSimilarDocuments(query, context, apiKey);
    return formatSearchResults(results);
  } catch (error) {
    console.error("Error performing RAG:", error);
    return "An error occurred while searching for information.";
  }
};