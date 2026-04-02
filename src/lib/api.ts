import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_XANO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status as number | undefined;
      const apiError = error?.response?.data?.error as string | undefined;
      const apiCode = error?.response?.data?.code as string | undefined;

      if (status === 401) {
        window.localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }

      if (apiError === "account_pending_verification" || apiCode === "account_pending_verification") {
        window.location.href = "/auth/pending";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
