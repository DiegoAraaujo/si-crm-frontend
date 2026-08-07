import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

vi.mock("@/modules/kanban/api", () => ({
  getKanban: vi.fn(),
  moveLead: vi.fn(),
}));

import { getKanban, moveLead } from "@/modules/kanban/api";
import { useKanban, useMoveLead } from "@/modules/kanban/hooks";

const invalidateQueries = vi.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  queryClient.invalidateQueries = invalidateQueries as any;

  return function Wrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
};

describe("useKanban", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getKanban", async () => {
    vi.mocked(getKanban).mockResolvedValue([] as any);

    renderHook(() => useKanban(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getKanban).toHaveBeenCalledTimes(1);
    });
  });

  it("starts loading", () => {
    vi.mocked(getKanban).mockImplementation(
      () => new Promise(() => {}),
    );

    const { result } = renderHook(() => useKanban(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});

describe("useMoveLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("moves lead", async () => {
    vi.mocked(moveLead).mockResolvedValue(undefined as any);

    const { result } = renderHook(() => useMoveLead(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      leadId: "1",
      statusId: "2",
    });

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    expect(moveLead).toHaveBeenCalledWith("1", "2");
  });

  it("invalidates queries after success", async () => {
    vi.mocked(moveLead).mockResolvedValue(undefined as any);

    const { result } = renderHook(() => useMoveLead(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      leadId: "1",
      statusId: "2",
    });

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["kanban"],
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["dashboard"],
    });
  });

  it("returns error when api fails", async () => {
    vi.mocked(moveLead).mockRejectedValue(
      new Error("Server error"),
    );

    const { result } = renderHook(() => useMoveLead(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      leadId: "1",
      statusId: "2",
    });

    await waitFor(() =>
      expect(result.current.isError).toBe(true),
    );
  });
});