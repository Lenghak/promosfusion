"use client";

import { useEffect } from "react";

import { authorizedAxios } from "@/lib/axios/axios";

import { useSession } from "next-auth/react";

const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestInterceptor = authorizedAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${session?.user.token}`;

        console.log(config);
        return config;
      }
    );

    return () => authorizedAxios.interceptors.request.eject(requestInterceptor);
  }, [session]);

  return authorizedAxios;
};

export { useAxiosAuth };
