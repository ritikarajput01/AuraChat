import { MistralClient } from '@mistralai/mistralai';
import * as cheerio from 'cheerio';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

// Function to perform a web search using a search API
export const searchWeb = async (query: string, apiKey: string): Promise<SearchResult[]> => {
  try {
    // For demonstration purposes, we'll use a mock search result
    // In a production environment, you would integrate with a real search API
    // such as Google Custom Search, Bing Search, or another search provider
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock search results that are more relevant to the query
    return [
      {
        title: `${query} - Comprehensive Guide`,
        url: "https://example.com/comprehensive-guide",
        snippet: `This comprehensive guide covers everything you need to know about ${query}. It includes detailed explanations, examples, and best practices for implementation.`
      },
      {
        title: `How to solve problems related to ${query}`,
        url: "https://example.com/problem-solving",
        snippet: `Learn effective strategies for solving common problems related to ${query}. This article provides step-by-step solutions with practical examples.`
      },
      {
        title: `Latest developments in ${query} (2025)`,
        url: "https://example.com/latest-developments",
        snippet: `Stay updated with the most recent advancements and innovations in ${query}. This article covers breakthroughs, new techniques, and future trends.`
      },
      {
        title: `${query} for beginners: Getting started`,
        url: "https://example.com/beginners-guide",
        snippet: `A beginner-friendly introduction to ${query}. This guide breaks down complex concepts into easy-to-understand explanations with practical examples.`
      }
    ];
  } catch (error) {
    console.error("Error searching the web:", error);
    return [];
  }
};

// Function to fetch and parse content from a URL
export const fetchWebContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove script and style elements
    $('script, style, nav, footer, header, aside').remove();
    
    // Get the text content
    const text = $('body').text()
      .replace(/\s+/g, ' ')
      .trim();
    
    return text;
  } catch (error) {
    console.error("Error fetching web content:", error);
    return "";
  }
};

// Function to format search results for display
export const formatSearchResults = (results: SearchResult[]): string => {
  if (results.length === 0) {
    return "No relevant information found on the web.";
  }
  
  return results.map((result, index) => {
    return `### [${result.title}](${result.url})\n${result.snippet}\n`;
  }).join("\n");
};

// Main function to perform a web search and format the results
export const performWebSearch = async (query: string, apiKey: string): Promise<string> => {
  try {
    // Search the web for the query
    const searchResults = await searchWeb(query, apiKey);
    
    // Format the search results
    const formattedResults = formatSearchResults(searchResults);
    
    // Add a header to the results
    return `## Web Search Results for: "${query}"\n\n${formattedResults}\n\n*Note: These results were retrieved from the web and may not be completely accurate or up-to-date.*`;
  } catch (error) {
    console.error("Error performing web search:", error);
    return "An error occurred while searching the web. Please try again.";
  }
};

// Function to enhance an AI response with web search results
export const enhanceResponseWithWebSearch = async (
  query: string,
  apiKey: string,
  mistralClient: MistralClient
): Promise<string> => {
  try {
    // Perform web search
    const searchResults = await performWebSearch(query, apiKey);
    
    // Create a prompt that asks the AI to use the search results
    const prompt = `
I need to answer the following question: "${query}"

Here are some search results from the web that might help:

${searchResults}

Please provide a comprehensive answer to the question based on these search results. 
Include relevant information from the search results and cite your sources.
Format your response in markdown with proper headings, lists, and citations.
Be specific and directly address the user's question without going off-topic.
`;

    // Get AI response
    const response = await mistralClient.chat({
      model: "mistral-large-latest",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that provides accurate, helpful, and detailed responses based on web search results. Always directly address the user's question and stay on topic."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: 0.5, // Lower temperature for more factual responses
      top_p: 0.9,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error enhancing response with web search:", error);
    return "I encountered an error while searching the web. Please try again or rephrase your question.";
  }
};