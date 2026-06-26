import { CloseIcon, DocumentIcon } from "@icons/index";

interface FilePreviewProps {
  selectedFile: File | null;
  previewUrl: string | null;
  thumb: string | null;
  onFileRemove: () => void;
}

export const FilePreview = ({
  selectedFile,
  previewUrl,
  thumb,
  onFileRemove,
}: FilePreviewProps) => {
  return (
    <div className="relative w-40 h-24 rounded bg-gray-100 overflow-hidden">
      {selectedFile?.type.startsWith("image/") && previewUrl && (
        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
      )}

      {selectedFile?.type.startsWith("video/") && previewUrl && (
        <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
          {thumb ? (
            <img src={thumb} className="w-full h-full object-cover" alt="Video thumbnail" />
          ) : (
            <video
              src={previewUrl}
              muted
              className="w-full h-full object-cover"
              preload="metadata"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1" />
            </div>
          </div>
        </div>
      )}

      {selectedFile && selectedFile.type.startsWith("application/") && (
        <div className="w-full h-full flex flex-col items-center justify-center text-sm text-blue-500 gap-1 p-2 bg-blue-200">
          <DocumentIcon />
          <span className="truncate text-xs text-gray-600 max-w-[120px]">
            {selectedFile.name}
          </span>
        </div>
      )}

      <CloseIcon
        className="absolute top-1 right-1 cursor-pointer dark:fill-red-500 z-10"
        onClick={onFileRemove}
      />
    </div>
  );
};
