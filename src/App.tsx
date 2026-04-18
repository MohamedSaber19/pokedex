import { DetailPage } from "@/features/pokemon/pages/DetailPage";
import { ListPage } from "@/features/pokemon/pages/ListPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/pokemon/:id" element={<DetailPage />} />
    </Routes>
  );
}
