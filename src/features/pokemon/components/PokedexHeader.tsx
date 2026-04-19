import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type View = "pages" | "scroll";

export default function PokedexHeader({ view }: { view: View }) {
  return (
    <header className="pt-12 pb-8 text-center">
      <h1 className="inline-flex items-center gap-2 text-3xl font-bold text-gray-900">
        <Zap className="size-7 fill-amber-400 text-amber-400" />
        Pokédex
      </h1>
      <p className="mt-2 text-gray-500">
        Discover and explore Pokemon with{" "}
        {view === "scroll" ? "infinite scroll" : "page controls"}
      </p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <ViewButton view="pages" current={view}>
          Page Controls
        </ViewButton>
        <ViewButton view="scroll" current={view}>
          Infinite Scroll
        </ViewButton>
      </div>
    </header>
  );
}

function ViewButton({
  view,
  current,
  children,
}: {
  view: View;
  current: View;
  children: ReactNode;
}) {
  const active = view === current;
  return (
    <Link
      to={`/?view=${view}`}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors",
        active
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900 hover:bg-gray-50",
      )}
    >
      {children}
    </Link>
  );
}
