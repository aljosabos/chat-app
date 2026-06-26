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
        <img src={previewUrl} className="w-full h-full object-cover" />
      )}

      {selectedFile?.type.startsWith("video/") && thumb && (
        <img src={thumb} className="w-full h-full object-cover" />
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
        className="absolute top-1 right-1 cursor-pointer dark:fill-red-500"
        onClick={onFileRemove}
      />
    </div>
  );
};
