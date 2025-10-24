import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Shop from "./pages/Shop";
import Portfolio from "./pages/Portfolio";
import MuralService from "./pages/MuralService";
import AdminProducts from "./pages/AdminProducts";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/workshops"} component={Workshops} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/mural-service"} component={MuralService} />
      <Route path={"/admin/products"} component={AdminProducts} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

