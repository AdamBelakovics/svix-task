import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { EventTypePage } from "./event-types/EventTypePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <EventTypePage />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
