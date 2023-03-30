import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Svix } from "svix";
import { EventTypeArchive } from "./EventTypeDelete";
import { EventTypeEdit } from "./EventTypeEdit";

export function EventTypeTable() {
  const {
    data: eventTypes,
    error,
    isFetching,
  } = useQuery("eventTypes", async () => {
    const svix = new Svix(process.env.REACT_APP_SVIX_API_KEY as string);
    const response = await svix.eventType.list();

    return response.data;
  });

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error while fetching eventTypes</h1>;
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Feature Flag</Th>
            <Th>Edit</Th>
            <Th>Archive</Th>
          </Tr>
        </Thead>
        <Tbody>
          {eventTypes?.map((eventType) => (
            <Tr key={eventType.name}>
              <Td>{eventType.name}</Td>
              <Td>{eventType.description}</Td>
              <Td>{eventType.featureFlag}</Td>
              <Td>
                <EventTypeEdit eventType={eventType} />
              </Td>
              <Td>
                <EventTypeArchive eventTypeName={eventType.name} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
