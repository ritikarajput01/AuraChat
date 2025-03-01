import React, { useState } from 'react';
import { Search, X, Loader2, Globe } from 'lucide-react';
import { performWebSearch } from '../utils/webSearchUtils';

interface WebSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchResults: (results: string) => void;
}

export const WebSearchModal: React.FC<WebSearchModalProps> = ({
  isOpen,
  onClose,
  onSearchResults,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
      if (!apiKey) {
        throw new Error("API key not configured");
      }
      
      const results = await performWebSearch(query, apiKey);
      onSearchResults(results);
      onClose();
    } catch (error) {
      console.error("Web search error:", error);
      onSearchResults("An error occurred during web search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1a1a3a] border-2 border-[#00f3ff]/60 rounded-xl shadow-xl shadow-[#00f3ff]/20 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#00f3ff]/20">
          <h3 className="text-xl font-bold text-[#00f3ff] flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Web Search
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#00f3ff]/10 rounded-lg transition-colors text-[#00f3ff]/70 hover:text-[#00f3ff]"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-[#00f3ff]/70" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the web..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-white placeholder-[#00f3ff]/80 focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              autoFocus
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="px-4 py-2 bg-[#00f3ff]/30 text-[#00f3ff] border-2 border-[#00f3ff]/60 rounded-lg hover:bg-[#00f3ff]/40 hover:border-[#00f3ff] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Search Web</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};