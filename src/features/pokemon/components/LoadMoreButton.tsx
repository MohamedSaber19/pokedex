import { Loader2 } from "lucide-react";

type Props = {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
};

export function LoadMoreButton({ onClick, loading, hasMore }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-600">
        <Loader2 className="size-4 animate-spin" />
        Loading more Pokemon...
      </div>
    );
  }

  if (!hasMore) {
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        You've caught 'em all.
      </p>
    );
  }

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={onClick}
        className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
      >
        Load More
      </button>
    </div>
  );
}
