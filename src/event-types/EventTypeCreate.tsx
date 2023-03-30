import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { EventTypeIn } from "svix";
import { useSvixClient } from "../utils/svixClient.context";
import { EventTypeForm } from "./EventTypeForm";

export function EventTypeCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const svixClient = useSvixClient();

  const { mutate: createEventType } = useMutation(
    async (newEventType: EventTypeIn) => {
      const result = await svixClient.eventType.create(newEventType);
      queryClient.invalidateQueries("eventTypes");
      return result;
    }
  );

  return (
    <>
      <Button colorScheme="teal" size="lg" onClick={onOpen}>
        Create event type
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create event type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventTypeForm onClose={onClose} onSubmit={createEventType} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
