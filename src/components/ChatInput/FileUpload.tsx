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
    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#3a3a5a] border-2 border-[#00f3ff]/40">
      <div className="flex-1 truncate text-[#00f3ff]">
        <span className="text-sm font-medium">{selectedFile.name}</span>
        <span className="text-xs text-[#00f3ff]/70 ml-2">
          ({(selectedFile.size / 1024).toFixed(1)} KB)
        </span>
      </div>
      {isProcessingFile ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#00f3ff]/70" />
      ) : (
        <button
          onClick={onRemoveFile}
          className="p-1 hover:bg-[#4a4a6a] rounded-lg transition-colors text-[#00f3ff]/70 hover:text-[#00f3ff]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};