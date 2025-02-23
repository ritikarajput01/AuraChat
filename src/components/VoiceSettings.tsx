import React from 'react';
import { VoiceConfig } from '../types';
import { X } from 'lucide-react';

interface VoiceSettingsProps {
  voiceConfig: VoiceConfig;
  setVoiceConfig: React.Dispatch<React.SetStateAction<VoiceConfig>>;
  onClose: () => void;
}

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  voiceConfig,
  setVoiceConfig,
  onClose,
}) => {
  const voices = window.speechSynthesis.getVoices();

  return (
    <div className="border-b border-[#00f3ff]/10 glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-[#00f3ff]">Voice Settings</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#00f3ff]/10 rounded-lg transition-colors text-[#00f3ff]/70 hover:text-[#00f3ff]"
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#00f3ff]/70 mb-2">
            Voice
          </label>
          <select
            value={voiceConfig.voice?.name || ''}
            onChange={(e) => {
              const selectedVoice = voices.find(v => v.name === e.target.value);
              setVoiceConfig(prev => ({ ...prev, voice: selectedVoice || null }));
            }}
            className="w-full p-3 rounded-lg bg-[#0a0a1f] border border-[#00f3ff]/30 text-[#00f3ff] focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50"
          >
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#00f3ff]/70 mb-2">
              Pitch ({voiceConfig.pitch})
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceConfig.pitch}
              onChange={(e) => setVoiceConfig(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
              className="w-full accent-[#00f3ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#00f3ff]/70 mb-2">
              Rate ({voiceConfig.rate})
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceConfig.rate}
              onChange={(e) => setVoiceConfig(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
              className="w-full accent-[#00f3ff]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#00f3ff]/70 mb-2">
              Volume ({voiceConfig.volume})
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={voiceConfig.volume}
              onChange={(e) => setVoiceConfig(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
              className="w-full accent-[#00f3ff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};