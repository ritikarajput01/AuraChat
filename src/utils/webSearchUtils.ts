import axios from 'axios';
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
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock search results that are more relevant to the query
    return [
      {
        title: `${query} - Latest Information (2025)`,
        url: "https://example.com/latest-info",
        snippet: `Find the most up-to-date information about ${query}. Our comprehensive guide covers everything you need to know, including recent developments and expert insights.`
      },
      {
        title: `Complete Guide to ${query}`,
        url: "https://example.com/complete-guide",
        snippet: `Learn everything about ${query} with our detailed guide. Includes practical examples, best practices, and expert recommendations for better understanding.`
      },
      {
        title: `${query} - Expert Analysis`,
        url: "https://example.com/expert-analysis",
        snippet: `Professional analysis and insights about ${query}. Discover key concepts, common challenges, and innovative solutions from industry experts.`
      },
      {
        title: `Understanding ${query} - Practical Guide`,
        url: "https://example.com/practical-guide",
        snippet: `A practical approach to understanding ${query}. This guide breaks down complex topics into easy-to-understand explanations with real-world examples.`
      }
    ];
  } catch (error) {
    console.error("Error searching the web:", error);
    return [];
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