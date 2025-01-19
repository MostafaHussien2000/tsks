/* React 
======== */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* React Router DOM
=================== */
import { BrowserRouter } from "react-router-dom";

/* React Redux
============== */
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

/* ChadCN
========= */
import { ThemeProvider } from "./components/theme-provider.tsx";

/* Components
============= */
import App from "./App.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="tsks-ui-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
