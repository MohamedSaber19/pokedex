import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const baseBtn =
  "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-sm px-3 text-sm font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <nav className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={cn(baseBtn, "bg-white text-gray-700 hover:bg-gray-50")}
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="hidden items-center gap-2 sm:flex">
        {pageWindow(page, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="px-1 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={cn(
                baseBtn,
                p === page
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50",
              )}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <span className="text-sm text-gray-600 sm:hidden">
        {page} / {totalPages}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(baseBtn, "bg-white text-gray-700 hover:bg-gray-50")}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 5) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 4)
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}
