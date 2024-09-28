const languageDetector = {
    type: "languageDetector",
    async: true,
    detect: (cb) => {
      const storedLanguage = typeof window !== "undefined" ? window.localStorage.getItem("language") : null;
      const detectedLanguage = storedLanguage || "en";
      cb(detectedLanguage);
    },
    init: () => {},
    cacheUserLanguage: (lng) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("language", lng);
      }
    },
  };
  
  export default languageDetector;
  