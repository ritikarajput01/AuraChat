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
    
    // Return mock search results
    return [
      {
        title: "Result 1 for " + query,
        url: "https://example.com/result1",
        snippet: "This is a snippet from the first search result that matches your query about " + query
      },
      {
        title: "Result 2 for " + query,
        url: "https://example.com/result2",
        snippet: "Another relevant snippet from the second search result about " + query
      },
      {
        title: "Result 3 for " + query,
        url: "https://example.com/result3",
        snippet: "A third snippet from another search result related to " + query
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
`;

    // Get AI response
    const response = await mistralClient.chat({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error enhancing response with web search:", error);
    return "I encountered an error while searching the web. Please try again or rephrase your question.";
  }
};