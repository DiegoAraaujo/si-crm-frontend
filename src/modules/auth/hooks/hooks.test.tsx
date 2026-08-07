import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useLogin, useRegister, useLogout } from "@/modules/auth/hooks";

vi.mock("@/modules/auth/api", () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
}));

vi.mock("@/store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

import { login, register, logout } from "@/modules/auth/api";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const mockPush = vi.fn();
const mockSetAccessToken = vi.fn();
const mockSetUser = vi.fn();
const mockClear = vi.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
  vi.mocked(useAuthStore).mockReturnValue({
    setAccessToken: mockSetAccessToken,
    setUser: mockSetUser,
    clear: mockClear,
  } as any);
});

describe("useLogin", () => {
  it("stores token and user in store and redirects to /dashboard on success", async () => {
    const fakeResponse = {
      accessToken: "token-123",
      user: { id: "1", name: "Diego" },
    };
    vi.mocked(login).mockResolvedValue(fakeResponse as any);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({ email: "diego@email.com", password: "123456" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSetAccessToken).toHaveBeenCalledWith("token-123");
    expect(mockSetUser).toHaveBeenCalledWith(fakeResponse.user);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect or update store when request fails", async () => {
    vi.mocked(login).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({ email: "x@x.com", password: "wrongpass" });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockPush).not.toHaveBeenCalled();
    expect(mockSetAccessToken).not.toHaveBeenCalled();
  });
});

describe("useRegister", () => {
  it("stores token and user in store and redirects to /dashboard on success", async () => {
    const fakeResponse = {
      accessToken: "token-456",
      user: { id: "2", name: "New User" },
    };
    vi.mocked(register).mockResolvedValue(fakeResponse as any);

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({
      name: "New User",
      email: "new@email.com",
      password: "123456",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSetAccessToken).toHaveBeenCalledWith("token-456");
    expect(mockSetUser).toHaveBeenCalledWith(fakeResponse.user);
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect or update store when registration fails", async () => {
    vi.mocked(register).mockRejectedValue(new Error("Email already taken"));

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({ name: "X", email: "x@x.com", password: "123456" });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockPush).not.toHaveBeenCalled();
    expect(mockSetAccessToken).not.toHaveBeenCalled();
  });
});

describe("useLogout", () => {
  it("clears store and redirects to /login on success", async () => {
    vi.mocked(logout).mockResolvedValue(undefined as any);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });
    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockClear).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("does not clear store when logout fails", async () => {
    vi.mocked(logout).mockRejectedValue(new Error("Server error"));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });
    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockClear).not.toHaveBeenCalled();
  });
});
