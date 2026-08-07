import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("returns a single class unchanged", () => {
    expect(cn("text-sm")).toBe("text-sm");
  });

  it("concatenates multiple classes", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
  });

  it("resolves tailwind conflicts keeping the last class", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("ignores falsy values", () => {
    expect(cn("text-sm", false, null, undefined, "")).toBe("text-sm");
  });

  it("applies conditional class when condition is true", () => {
    const hasError = true;
    expect(cn("border", hasError && "border-red-500")).toBe(
      "border border-red-500",
    );
  });

  it("does not apply class when condition is false", () => {
    const hasError = false;
    expect(cn("border", hasError && "border-red-500")).toBe("border");
  });

  it("returns empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });
});
