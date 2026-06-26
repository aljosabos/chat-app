import type { FileType } from "@features/chat/types";

export const MessageFile = ({ file }: { file: FileType }) => {
  return (
    <div className="mt-2">
      {file.type === "image" && (
        <img src={file.url} alt={file.name} className="max-w-[250px] rounded" />
      )}

      {file.type === "video" && (
        <video controls className="max-w-[250px] rounded">
          <source src={file.url} />
        </video>
      )}

      {file.type === "document" && (
        <a
          href={file.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          📄 {file.name}
        </a>
      )}
    </div>
  );
};
