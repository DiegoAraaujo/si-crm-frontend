import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useLeads, useLead, useCreateLead, useDeleteLead } from "./";

import * as api from "../api";

vi.mock("../api");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("leads hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useLeads should fetch list", async () => {
    vi.mocked(api.getLeads).mockResolvedValue([
      { id: "1", name: "Lead 1" },
    ] as any);

    const { result } = renderHook(() => useLeads(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(api.getLeads).toHaveBeenCalled();
  });

  it("useLead should fetch single lead", async () => {
    vi.mocked(api.getLead).mockResolvedValue({
      id: "1",
      name: "Lead 1",
    } as any);

    const { result } = renderHook(() => useLead("1"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data?.id).toBe("1");
    });

    expect(api.getLead).toHaveBeenCalledWith("1");
  });

  it("useCreateLead should call API on mutate", async () => {
    vi.mocked(api.createLead).mockResolvedValue({ id: "1" } as any);

    const { result } = renderHook(() => useCreateLead(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: "Novo Lead",
    } as any);

    await waitFor(() => {
      expect(api.createLead).toHaveBeenCalled();
    });
  });

  it("useDeleteLead should call API", async () => {
    vi.mocked(api.deleteLead).mockResolvedValue({} as any);

    const { result } = renderHook(() => useDeleteLead(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("123");

    await waitFor(() => {
      expect(api.deleteLead).toHaveBeenCalledWith(
        "123",
        expect.any(Object), // 👈 CONTEXT DO REACT QUERY
      );
    });
  });
});
