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

export function EventTypeTable() {
  const {
    data: eventTypes,
    error,
    isFetching,
  } = useQuery("eventTypes", async () => {
    const svix = new Svix(process.env.REACT_APP_SVIX_API_KEY as string);
    const response = await svix.eventType.list();

    console.log(response.data);

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
          </Tr>
        </Thead>
        <Tbody>
          {eventTypes?.map((eventType) => (
            <Tr key={eventType.name}>
              <Td>{eventType.name}</Td>
              <Td>{eventType.description}</Td>
              <Td>{eventType.featureFlag}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
