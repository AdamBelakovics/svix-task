import { ChakraProvider } from "@chakra-ui/react";
import { toast, Toaster } from "react-hot-toast";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Svix } from "svix";
import { EventTypePage } from "./event-types/EventTypePage";
import { SvixClientContext } from "./utils/svixClient.context";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  }),
  queryCache: new QueryCache({
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  }),
});

const svixClient = new Svix(process.env.REACT_APP_SVIX_API_KEY as string);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SvixClientContext.Provider value={svixClient}>
          <EventTypePage />
          <Toaster />
        </SvixClientContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
