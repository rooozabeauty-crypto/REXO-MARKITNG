import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Lora from "./pages/Lora";
import PosterMaker from "./pages/PosterMaker";
import MarketingPhrases from "./pages/MarketingPhrases";
import Subscriptions from "./pages/Subscriptions";
import Support from "./pages/Support";
import Analytics from "./pages/Analytics";
import Campaigns from "./pages/Campaigns";
import Inventory from "./pages/Inventory";
import SocialMedia from "./pages/SocialMedia";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/lora"} component={Lora} />
      <Route path={"/poster-maker"} component={PosterMaker} />
      <Route path={"/marketing-phrases"} component={MarketingPhrases} />
      <Route path={"/subscriptions"} component={Subscriptions} />
      <Route path={"/support"} component={Support} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/campaigns"} component={Campaigns} />
      <Route path={"/inventory"} component={Inventory} />
      <Route path={"/social-media"} component={SocialMedia} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
