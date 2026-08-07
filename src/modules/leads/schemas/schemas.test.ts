import { describe, it, expect } from "vitest";
import { leadSchema } from "./";

describe("leadSchema", () => {
  it("should pass with valid data", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      email: "joao@email.com",
      phone: "11999999999",
      type: "COMPRA",
      propertyType: "CASA",
      origin: "SITE",
      city: "São Paulo",
      neighborhood: "Centro",
      budgetMin: "100000",
      budgetMax: "500000",
      notes: "Teste",
    });

    expect(result.success).toBe(true);
  });

  it("should fail when name is too short", () => {
    const result = leadSchema.safeParse({
      name: "J",
      email: "joao@email.com",
      phone: "11999999999",
      type: "COMPRA",
      propertyType: "CASA",
      origin: "SITE",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with invalid email", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      email: "email-invalido",
      phone: "11999999999",
      type: "COMPRA",
      propertyType: "CASA",
      origin: "SITE",
    });

    expect(result.success).toBe(false);
  });

  it("should allow empty optional fields", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      email: "",
      phone: "",
      type: "COMPRA",
      propertyType: "CASA",
      origin: "SITE",
    });

    expect(result.success).toBe(true);
  });
});
