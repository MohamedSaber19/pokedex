import { AlertCircle, RefreshCcw } from "lucide-react";

type Props = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <AlertCircle className="size-10 text-rose-500" />
      <p className="text-gray-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <RefreshCcw className="size-4" />
          Try again
        </button>
      )}
    </div>
  );
}
