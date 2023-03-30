import { VStack } from "@chakra-ui/react";
import { EventTypeCreate } from "./EventTypeCreate";
import { EventTypeTable } from "./EventTypeTable";

export function EventTypePage() {
  return (
    <VStack m={5} spacing={5}>
      <EventTypeCreate />
      <EventTypeTable />
    </VStack>
  );
}
