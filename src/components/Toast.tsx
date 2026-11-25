interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 rounded-md bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  );
}