import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useMe, useUpdateMe } from "./";
import * as api from "../api";
import { useAuthStore } from "@/store/auth.store";

// mocks
vi.mock("../api", () => ({
  getMe: vi.fn(),
  updateMe: vi.fn(),
}));

vi.mock("@/store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

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

describe("profile hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useMe should fetch user data", async () => {
    (api.getMe as any).mockResolvedValue({ id: "1", name: "Diego" });

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(api.getMe).toHaveBeenCalled();
  });

  it("useUpdateMe should update user and invalidate cache", async () => {
    const setUserMock = vi.fn();

    (useAuthStore as unknown as any).mockImplementation((selector: any) =>
      selector({ setUser: setUserMock }),
    );

    (api.updateMe as any).mockResolvedValue({
      id: "1",
      name: "Novo Nome",
    });

    const { result } = renderHook(() => useUpdateMe(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: "Novo Nome",
    });

    await waitFor(() => {
      expect(api.updateMe).toHaveBeenCalledWith(
        { name: "Novo Nome" },
        expect.any(Object),
      );
      expect(setUserMock).toHaveBeenCalledWith({
        id: "1",
        name: "Novo Nome",
      });
    });
  });
});
