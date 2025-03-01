import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { performRAG } from '../utils/ragUtils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchResults: (results: string) => void;
  context: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSearchResults,
  context
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
      
      const results = await performRAG(query, context, apiKey);
      onSearchResults(results);
      onClose();
    } catch (error) {
      console.error("Search error:", error);
      onSearchResults("An error occurred during search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1a1a3a] border-2 border-[#00f3ff]/60 rounded-xl shadow-xl shadow-[#00f3ff]/20 overflow-hidden">
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-[#00f3ff]/20">
          <h3 className="text-lg md:text-xl font-bold text-[#00f3ff]">Search Knowledge Base</h3>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-[#00f3ff]/10 rounded-lg transition-colors text-[#00f3ff]/70 hover:text-[#00f3ff]"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-[#00f3ff]/70" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to search for?"
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 rounded-lg bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-white placeholder-[#00f3ff]/80 focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff] text-sm md:text-base"
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
              className="px-3 md:px-4 py-1.5 md:py-2 bg-[#00f3ff]/30 text-[#00f3ff] border-2 border-[#00f3ff]/60 rounded-lg hover:bg-[#00f3ff]/40 hover:border-[#00f3ff] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm md:text-base"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};