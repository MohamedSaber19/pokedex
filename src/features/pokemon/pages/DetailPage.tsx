import { useParams } from "react-router-dom";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  return <div className="p-8">detail #{id} (wip)</div>;
}
