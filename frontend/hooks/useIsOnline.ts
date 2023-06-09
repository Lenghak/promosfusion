import { useEffect, useState } from "react";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, [navigator.onLine]);

  return isOnline;
};

export { useIsOnline };
