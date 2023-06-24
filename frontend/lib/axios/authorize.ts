import { getCurrentUser } from "@/lib/next-auth";

import { authorizedAxios } from "./axios";

const authorizeAxios = async () => {
  const session = await getCurrentUser();

  const requestInterceptor = authorizedAxios.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"])
        config.headers["Authorization"] = `Bearer ${session?.user.token}`;

      return config;
    }
  );

  authorizedAxios.interceptors.request.eject(requestInterceptor);
  return authorizedAxios;
};

export { authorizeAxios };
