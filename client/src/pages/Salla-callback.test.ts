import { describe, it, expect, beforeEach, vi } from "vites":
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("Salla OAuth Callback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("يجب أن تكون بيانات سلة معرفة في متغيرات البيئة", () => {
    const sallaClientId = process.env.SALLA_CLIENT_ID;
    const sallaClientSecret = process.env.SALLA_CLIENT_SECRET;

    expect(sallaClientId).toBeDefined();
    expect(sallaClientSecret).toBeDefined();
    expect(sallaClientId).toBe("7e42b932-6690-477d-aba0-a9fca78047e5");
    expect(sallaClientSecret).toBe(
      "500e2b09edadf85df68b8b4b70dffabb60a81474007a5a32f801b825716b6c32"
    );
  });

  it("يجب أن تكون بيانات سلة غير فارغة", () => {
    const sallaClientId = process.env.SALLA_CLIENT_ID;
    const sallaClientSecret = process.env.SALLA_CLIENT_SECRET;

    expect(sallaClientId).not.toBe("");
    expect(sallaClientSecret).not.toBe("");
    expect(sallaClientId?.length).toBeGreaterThan(0);
    expect(sallaClientSecret?.length).toBeGreaterThan(0);
  });

  it("يجب أن يكون Callback URL صحيحاً", () => {
    const callbackUrl = "https://rexo-markitng.onrender.com/callback
    expect(callbackUrl).toContain("rexomarketing");
    expect(callbackUrl).toContain("callback");
    expect(callbackUrl).toMatch(/^https:\/\//);
  });

  it("يجب أن تكون بيانات سلة بالصيغة الصحيحة", () => {
    const sallaClientId = process.env.SALLA_CLIENT_ID;
    const sallaClientSecret = process.env.SALLA_CLIENT_SECRET;

    // التحقق من صيغة Client ID (UUID format)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(sallaClientId).toMatch(uuidRegex);

    // التحقق من صيغة Client Secret (hex string)
    const hexRegex = /^[0-9a-f]+$/i;
    expect(sallaClientSecret).toMatch(hexRegex);
  });

  it("يجب أن تكون بيانات سلة متطابقة مع المدخلات", () => {
    const expectedClientId = "7e42b932-6690-477d-aba0-a9fca78047e5";
    const expectedClientSecret =
      "500e2b09edadf85df68b8b4b70dffabb60a81474007a5a32f801b825716b6c32";

    expect(process.env.SALLA_CLIENT_ID).toBe(expectedClientId);
    expect(process.env.SALLA_CLIENT_SECRET).toBe(expectedClientSecret);
  });
});
