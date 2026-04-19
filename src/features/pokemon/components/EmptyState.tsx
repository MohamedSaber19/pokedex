export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-gray-700">{message}</p>
    </div>
  );
}
