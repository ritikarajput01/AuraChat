import React, { useState } from 'react';
import { MistralModel, MODEL_CATEGORIES, MODEL_INFO } from '../../types';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ModelSelectorProps {
  currentModel: MistralModel;
  onChangeModel: (model: MistralModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onChangeModel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState<MistralModel | null>(null);
  
  const currentModelInfo = MODEL_INFO[currentModel];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto px-3 py-2 md:py-2.5 rounded-lg bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-[#00f3ff] text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff] transition-all hover:border-[#00f3ff]/80 flex items-center justify-between gap-2"
      >
        <span>{MODEL_INFO[currentModel].name}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full md:w-80 bg-[#1a1a3a] border-2 border-[#00f3ff]/60 rounded-lg shadow-lg shadow-[#00f3ff]/20 overflow-hidden">
          <div className="max-h-96 overflow-y-auto p-2">
            {MODEL_CATEGORIES.map((category) => (
              <div key={category.name} className="mb-3">
                <div className="text-[#00f3ff] font-semibold text-sm mb-1 px-2">{category.name}</div>
                {category.models.map((model) => (
                  <div key={model} className="relative">
                    <button
                      onClick={() => {
                        onChangeModel(model);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                        currentModel === model
                          ? 'bg-[#00f3ff]/20 text-[#00f3ff]'
                          : 'hover:bg-[#2a2a4a] text-white'
                      }`}
                    >
                      <span>{MODEL_INFO[model].name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowInfo(showInfo === model ? null : model);
                        }}
                        className="p-1 hover:bg-[#00f3ff]/10 rounded-full"
                      >
                        <Info className="w-4 h-4 text-[#00f3ff]/70" />
                      </button>
                    </button>
                    
                    {showInfo === model && (
                      <div className="mt-1 mb-2 mx-2 p-3 bg-[#2a2a4a] rounded-lg border border-[#00f3ff]/30 text-sm">
                        <p className="text-white mb-2">{MODEL_INFO[model].description}</p>
                        <div className="mb-2">
                          <span className="text-[#00f3ff]/80 text-xs">Capabilities:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {MODEL_INFO[model].capabilities.map((capability, i) => (
                              <span key={i} className="px-2 py-0.5 bg-[#00f3ff]/10 text-[#00f3ff] rounded-full text-xs">
                                {capability}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[#00f3ff]/80 text-xs">Best for:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {MODEL_INFO[model].bestFor.map((use, i) => (
                              <span key={i} className="px-2 py-0.5 bg-[#bc13fe]/10 text-[#bc13fe] rounded-full text-xs">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-white/70">
                          Token limit: {MODEL_INFO[model].tokenLimit.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};