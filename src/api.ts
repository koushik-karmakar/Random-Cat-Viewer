import type { ApiResponse } from "./types";

const API_URL = "https://api.freeapi.app/api/v1/public/cats/cat/random";

export async function fetchRandomCat(): Promise<ApiResponse> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const data: ApiResponse = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Unknown API error");
  }
  return data;
}
