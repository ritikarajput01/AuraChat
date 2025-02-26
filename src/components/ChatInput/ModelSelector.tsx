import React from 'react';
import { MistralModel, MISTRAL_MODELS } from '../../types';

interface ModelSelectorProps {
  currentModel: MistralModel;
  onChangeModel: (model: MistralModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onChangeModel,
}) => {
  return (
    <select
      value={currentModel}
      onChange={(e) => onChangeModel(e.target.value as MistralModel)}
      className="w-full md:w-40 px-3 py-2 md:py-2.5 rounded-lg bg-[#2a2a4a] border-2 border-[#00f3ff]/60 text-[#00f3ff] text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff] transition-all hover:border-[#00f3ff]/80"
    >
      {MISTRAL_MODELS.map(model => (
        <option key={model} value={model} className="bg-[#2a2a4a] text-[#00f3ff]">
          {model}
        </option>
      ))}
    </select>
  );
};