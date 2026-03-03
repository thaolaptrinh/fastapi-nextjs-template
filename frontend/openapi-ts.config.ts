// @ts-nocheck - This file has type errors due to @hey-api/openapi-ts definitions, but works at runtime
import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./openapi.json",
  output: "./src/client",

  plugins: [
    // Native Fetch API (official TanStack Query example uses this)
    "@hey-api/client-fetch",

    // Zod schemas for runtime validation
    {
      name: "@hey-api/schemas",
      output: "zod",
    },

    // Auto-generate React Query hooks
    {
      name: "@tanstack/react-query",
      options: {
        query: {
          useSuspense: true,
          useInfinite: true,
        },
      },
    },
  ],
})
