import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header";
import { Home } from "./components/pages/home";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { Docs } from "./components/pages/docs";

const router = createBrowserRouter([
  {
    path: "/docs",
    element: <Docs />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Header />
      <main className="mt-4 container">
        <RouterProvider router={router} />
      </main>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
