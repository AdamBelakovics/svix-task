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
import { EventTypeIn, Svix } from "svix";
import { EventTypeForm } from "./EventTypeForm";

export function EventTypeCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate: createEventType } = useMutation(
    async (newEventType: EventTypeIn) => {
      const svix = new Svix(process.env.REACT_APP_SVIX_API_KEY as string);
      const result = await svix.eventType.create(newEventType);
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
