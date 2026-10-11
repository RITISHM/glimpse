/**
 * Backend API Configuration
 * Dynamically resolves the backend API URL from environment variables.
 *
 * Supported environment variables:
 * - VITE_API_BASE_URL: Full base URL with path (e.g. "https://glimpse-201r.onrender.com/api" or "http://localhost:5000/api")
 * - VITE_BACKEND_URL: Host URL without /api (e.g. "https://glimpse-201r.onrender.com" or "http://localhost:5000")
 */

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');
  }

  if (import.meta.env.VITE_BACKEND_URL) {
    return `${import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, '')}/api`;
  }

  // Fallback default
  return 'https://glimpse-201r.onrender.com/api';
};

export const API_URL = getApiBaseUrl();
export default API_URL;
