import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "@/modules/auth/schemas";

describe("loginSchema", () => {
  it("validates correct data without errors", () => {
    const result = loginSchema.safeParse({
      email: "user@email.com",
      password: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "123456",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("E-mail inválido");
  });

  it("rejects password shorter than 6 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@email.com",
      password: "123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Mínimo 6 caracteres");
  });

  it("rejects when email is missing", () => {
    const result = loginSchema.safeParse({ password: "123456" });
    expect(result.success).toBe(false);
  });

  it("rejects when password is missing", () => {
    const result = loginSchema.safeParse({ email: "user@email.com" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const valid = {
    name: "Diego",
    email: "diego@email.com",
    password: "123456",
    confirmPassword: "123456",
  };

  it("validates correct data without errors", () => {
    const result = registerSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = registerSchema.safeParse({ ...valid, name: "D" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Nome muito curto");
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({ ...valid, email: "invalid" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("E-mail inválido");
  });

  it("rejects password shorter than 6 characters", () => {
    const result = registerSchema.safeParse({
      ...valid,
      password: "123",
      confirmPassword: "123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Mínimo 6 caracteres");
  });

  it("rejects when passwords do not match", () => {
    const result = registerSchema.safeParse({
      ...valid,
      confirmPassword: "other-password",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Senhas não coincidem");
    expect(result.error?.issues[0].path).toContain("confirmPassword");
  });
});
