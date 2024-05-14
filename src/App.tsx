import "./App.css";
import { Header } from "./components/header";
import { Home } from "./components/pages/home";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Header />
      <main className="mt-4 container">
        <Home />
      </main>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
