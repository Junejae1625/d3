import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect = useEffect(() => {
  if (typeof window !== "undefined") {
    return useLayoutEffect;
  } else {
    return useEffect;
  }
}, []);

export default useIsomorphicLayoutEffect;
