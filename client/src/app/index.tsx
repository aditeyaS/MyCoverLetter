import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import Routes from "./routes";
import { Toaster } from "@/components/ui/toaster";

const client = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
