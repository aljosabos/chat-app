interface IConfirmationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete conversation?",
  message = "This action cannot be undone.",
}: IConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-200" />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-md
          mx-4
          rounded-lg
          bg-dark-2
          p-6
          shadow-xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        <h3 className="text-lg font-semibold mb-2 text-red-400">
          {title}
        </h3>

        <p className="text-sm dark:text-dark-text-2 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md hover:bg-dark-hover-1 text-white"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
