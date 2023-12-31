import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";

const emotionCache = createCache({
  key: "emotion-css-cache",
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </CacheProvider>
  </React.StrictMode>
);
