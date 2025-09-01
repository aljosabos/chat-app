import { useState } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (image) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(image.type)) {
        setError("Invalid file type!");
        return;
      }

      if (image.size > 5 * 1024 * 1024) {
        setError("File too large! Max 5MB");
        return;
      }

      setPreview(URL.createObjectURL(image));
      setFile(image);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="text-white text-sm mt-8 dark:bg-dark-bg-3 p-4 rounded-xl">
      {!file ? (
        <label htmlFor="image" className="cursor-pointer">
          Select image
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
        accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp"
        name="image"
        id="image"
        hidden
        className="w-full"
        onChange={handleFileChange}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 w-22 h-22 object-cover rounded-full"
        />
      )}
    </div>
  );
};
