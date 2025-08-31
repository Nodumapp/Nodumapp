import { refreshToken, logout } from "./auth";

export default function attachRefresh(api) {
  let isRefreshing = false;
  let queue = [];

  const processQueue = (error, token = null) => {
    queue.forEach(({ resolve, reject }) => {
      if (token) resolve(token);
      else reject(error);
    });
    queue = [];
  };

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // si no hay respuesta o no es 401 → rechazar normal
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      // evitar loops infinitos en endpoints de auth
      if (originalRequest.url?.includes("/auth/login") ||
          originalRequest.url?.includes("/auth/register") ||
          originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // en cola hasta que termine el refresh
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((newAccess) => {
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshToken();
        isRefreshing = false;
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      }
    }
  );
}
