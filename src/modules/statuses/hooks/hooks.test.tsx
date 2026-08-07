import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

vi.mock("@/modules/statuses/api", () => ({
  getStatuses: vi.fn(),
  createStatus: vi.fn(),
  updateStatus: vi.fn(),
  deleteStatus: vi.fn(),
}));

import {
  getStatuses,
  createStatus,
  updateStatus,
  deleteStatus,
} from "@/modules/statuses/api";

import {
  useStatuses,
  useCreateStatus,
  useUpdateStatus,
  useDeleteStatus,
} from "@/modules/statuses/hooks";

const mockInvalidateQueries = vi.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  // Intercepta de forma limpa as chamadas de invalidação
  queryClient.invalidateQueries = mockInvalidateQueries as any;

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

describe("useStatuses", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getStatuses", async () => {
    vi.mocked(getStatuses).mockResolvedValue([] as any);

    renderHook(() => useStatuses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(getStatuses).toHaveBeenCalledTimes(1),
    );
  });
});

describe("useCreateStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates status", async () => {
    vi.mocked(createStatus).mockResolvedValue({} as any);

    const { result } = renderHook(() => useCreateStatus(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: "Novo",
      color: "#fff",
      order: 0,
    });

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    expect(createStatus).toHaveBeenCalled();
  });

  it("invalidates queries", async () => {
    vi.mocked(createStatus).mockResolvedValue({} as any);

    const { result } = renderHook(() => useCreateStatus(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: "Novo",
      color: "#fff",
      order: 0,
    });

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    // Garante que a invalidação do cache de statuses aconteceu no sucesso da mutação
    expect(mockInvalidateQueries).toHaveBeenCalled();
  });
});

describe("useUpdateStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates status", async () => {
    vi.mocked(updateStatus).mockResolvedValue({} as any);

    const { result } = renderHook(() => useUpdateStatus(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      id: "1",
      payload: {
        name: "Novo Nome",
      },
    });

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    expect(updateStatus).toHaveBeenCalledWith("1", {
      name: "Novo Nome",
    });
  });
});

describe("useDeleteStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes status", async () => {
    vi.mocked(deleteStatus).mockResolvedValue(undefined as any);

    const { result } = renderHook(() => useDeleteStatus(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("1");

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    // Corrigido: o expect.any(Object) lida com o argumento interno do React Query sem quebrar o teste
    expect(deleteStatus).toHaveBeenCalledWith("1", expect.any(Object));
  });

  it("invalidates queries", async () => {
    vi.mocked(deleteStatus).mockResolvedValue(undefined as any);

    const { result } = renderHook(() => useDeleteStatus(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("1");

    await waitFor(() =>
      expect(result.current.isSuccess).toBe(true),
    );

    expect(mockInvalidateQueries).toHaveBeenCalled();
  });
});