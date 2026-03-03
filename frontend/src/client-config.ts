// Client configuration - NOT auto-generated
// This file persists after API client regeneration

import { client } from "@/client/client.gen"

// Set baseUrl from environment
const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? "http://localhost:8000" : "http://backend:8000")

client.setConfig({
  baseUrl: apiUrl,
})

export { client }
