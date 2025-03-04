import React from 'react';
import { X, Loader2 } from 'lucide-react';

interface FileUploadProps {
  selectedFile: File | null;
  onRemoveFile: () => void;
  isProcessingFile: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  onRemoveFile,
  isProcessingFile,
}) => {
  if (!selectedFile) return null;
  
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#3a3a5a] border-2 border-[#00f3ff]/60 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
      <div className="flex-1 truncate text-[#00f3ff]">
        <span className="text-sm font-medium">{selectedFile.name}</span>
        <span className="text-xs text-white ml-2">
          ({(selectedFile.size / 1024).toFixed(1)} KB)
        </span>
      </div>
      {isProcessingFile ? (
        <Loader2 className="w-5 h-5 animate-spin text-[#00f3ff]" />
      ) : (
        <button
          onClick={onRemoveFile}
          className="p-1.5 hover:bg-[#4a4a6a] rounded-lg transition-colors text-[#00f3ff] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};