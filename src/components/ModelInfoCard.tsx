import React from 'react';
import { MistralModel, MODEL_INFO } from '../types';
import { X } from 'lucide-react';

interface ModelInfoCardProps {
  model: MistralModel;
  onClose: () => void;
}

export const ModelInfoCard: React.FC<ModelInfoCardProps> = ({ model, onClose }) => {
  const modelInfo = MODEL_INFO[model];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1a1a3a] border-2 border-[#00f3ff]/60 rounded-xl shadow-xl shadow-[#00f3ff]/20 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#00f3ff]/20">
          <h3 className="text-xl font-bold text-[#00f3ff]">{modelInfo.name}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#00f3ff]/10 rounded-lg transition-colors text-[#00f3ff]/70 hover:text-[#00f3ff]"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <p className="text-white">{modelInfo.description}</p>
          
          <div>
            <h4 className="text-[#00f3ff]/80 text-sm font-medium mb-2">Capabilities</h4>
            <div className="flex flex-wrap gap-2">
              {modelInfo.capabilities.map((capability, i) => (
                <span key={i} className="px-3 py-1 bg-[#00f3ff]/10 text-[#00f3ff] rounded-full text-sm">
                  {capability}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[#00f3ff]/80 text-sm font-medium mb-2">Best For</h4>
            <div className="flex flex-wrap gap-2">
              {modelInfo.bestFor.map((use, i) => (
                <span key={i} className="px-3 py-1 bg-[#bc13fe]/10 text-[#bc13fe] rounded-full text-sm">
                  {use}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-[#2a2a4a] p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Token Limit</span>
              <span className="text-[#00f3ff] font-medium">{modelInfo.tokenLimit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};