import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

vi.mock("@/modules/dashboard/api", () => ({
  getDashboard: vi.fn(),
}));

import { getDashboard } from "@/modules/dashboard/api";
import { useDashboard } from "@/modules/dashboard/hooks";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("useDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getDashboard", async () => {
    vi.mocked(getDashboard).mockResolvedValue({} as any);

    renderHook(() => useDashboard(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getDashboard).toHaveBeenCalledTimes(1);
    });
  });

  it("returns loading initially", () => {
    vi.mocked(getDashboard).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useDashboard(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});
