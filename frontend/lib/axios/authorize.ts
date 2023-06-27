import { AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth/next";

import { authorizedAxios } from "./axios";

const authorizeAxios = async () => {
  authorizedAxios.interceptors.request.use(async (request) => {
    if (!isAccessTokenAttachedToAxiosDefaults())
      await setAccessTokenOnRequestAndAsAxiosDefaults(request);
    return request;
  });
  return authorizedAxios;
};

const isAccessTokenAttachedToAxiosDefaults = () => {
  const authHeader = authorizedAxios.defaults.headers.common["Authorization"];
  return !!!authHeader;
};

const setAccessTokenOnRequestAndAsAxiosDefaults = async (
  request: AxiosRequestConfig
) => {
  const session = await getServerSession();
  if (session) {
    const AuthHeaderValue = `Bearer ${session.user.token}`;
    if (!request.headers) request.headers = {};
    request.headers.Authorization = AuthHeaderValue;

    authorizedAxios.defaults.headers.common["Authorization"] =
      AuthHeaderValue; /* NOTE - This is to prevent calling getSession() again and again for each request. 
                                  Because getSession() internally calls api/auth/session, which would be very expensive to do
                                  for each request to our backend [Call to this API was consuming around 10% of our bandwidth provided to us by vercel]. 
                                  
                                  It will not only lead to increase in costs but also increase time to perform each request as 
                                  we have to every-time make a remote call to /api/auth/session. */
  }
};

const unsetAccessTokenAttachedToAxiosDefaults = () => {
  delete authorizedAxios.defaults.headers.common["Authorization"];
};

export { authorizeAxios, unsetAccessTokenAttachedToAxiosDefaults };
