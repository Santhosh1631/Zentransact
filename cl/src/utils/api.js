import { apiBaseUrl } from "./constants";

const normalizeBaseUrl = (baseUrl) => baseUrl.replace(/\/$/, "");

export const buildApiUrl = (path) => {
  const base = normalizeBaseUrl(apiBaseUrl);
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

export const fetchApiJson = async (path, options = {}) => {
  const response = await fetch(buildApiUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};

export const fetchBackendStatus = () => fetchApiJson("/api/status");
