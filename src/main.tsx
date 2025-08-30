import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.ts";
import {Provider as ReduxProvider} from "react-redux"
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <ReduxProvider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
     </ReduxProvider>
  </StrictMode>
);
