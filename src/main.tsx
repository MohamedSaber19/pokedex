import { ErrorBoundary } from "@/lib/ErrorBoundary";
import { getQueryClient } from "@/lib/queryClient";
import { ScrollToTop } from "@/lib/ScrollToTop";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={getQueryClient()}>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
