import { ChakraProvider } from "@chakra-ui/react";
import { EventTypePage } from "./event-types/EventTypePage";

function App() {
  return (
    <ChakraProvider>
      <EventTypePage />
    </ChakraProvider>
  );
}

export default App;
