import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

export function getQueryClient(): QueryClient {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
          retry: (failureCount, error) => {
            // Don't retry 4xx errors (auth, not found, etc.)
            if (
              error instanceof Error &&
              /API error: 4\d{2}/.test(error.message)
            ) {
              return false;
            }
            return failureCount < 3;
          },
          retryDelay: (attemptIndex) =>
            Math.min(1000 * 2 ** attemptIndex, 8000),
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
}
