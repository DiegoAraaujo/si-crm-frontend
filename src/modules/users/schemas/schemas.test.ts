import { describe, it, expect } from "vitest";
import { profileSchema } from "./";

describe("profileSchema", () => {
  it("should accept valid name", () => {
    const result = profileSchema.safeParse({
      name: "Diego Lopes",
    });

    expect(result.success).toBe(true);
  });

  it("should reject short name", () => {
    const result = profileSchema.safeParse({
      name: "A",
    });

    expect(result.success).toBe(false);
  });

  it("should return error message for invalid name", () => {
    const result = profileSchema.safeParse({
      name: "A",
    });

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nome muito curto");
    }
  });
});