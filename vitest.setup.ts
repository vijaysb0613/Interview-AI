import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// `server-only` is a Next.js build-time guard enforced by its webpack
// bundler; under Vitest it just throws unconditionally, so no-op it here.
vi.mock("server-only", () => ({}));
