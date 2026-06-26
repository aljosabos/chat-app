import { useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  allowedTypes?: string[];
  maxSizeMB?: number;
  showPreview?: boolean;
  label?: string;
}

export const FileUpload = ({
  onFileSelect,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  maxSizeMB = 10,
  showPreview = true,
  label = "Select file",
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setError(undefined);

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type!");
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large! Max ${maxSizeMB}MB`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);

    // preview samo ako treba
    if (showPreview && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
    setError(undefined);
    onFileSelect(null);
  };

  return (
    <div className="text-white text-sm mt-8 dark:bg-dark-6 p-4 rounded-xl">
      {!file ? (
        <label htmlFor="picture" className="cursor-pointer w-full block p-1">
          {label}
        </label>
      ) : (
        <button
          onClick={handleFileRemove}
          className="cursor-pointer hover:underline"
        >
          Remove file
        </button>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="file"
        accept={allowedTypes.join(",")}
        id="picture"
        hidden
        onChange={handleFileChange}
      />

      {showPreview && preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 w-22 h-22 object-cover rounded-full"
        />
      )}
    </div>
  );
};
