import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : 1024;
    const height = hasWindow ? window.innerHeight : 768;

    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export default useWindowDimensions;
