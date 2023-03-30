import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Svix } from "svix";
import { EventTypePage } from "./event-types/EventTypePage";
import { SvixClientContext } from "./utils/svixClient.context";

const queryClient = new QueryClient();

const svixClient = new Svix(process.env.REACT_APP_SVIX_API_KEY as string);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SvixClientContext.Provider value={svixClient}>
          <EventTypePage />
        </SvixClientContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
