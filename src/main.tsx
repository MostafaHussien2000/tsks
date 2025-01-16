import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./main.css";

import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="tsks-ui-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
