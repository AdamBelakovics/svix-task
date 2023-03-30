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

export type EventTypeEditProps = {
  eventType: { name: string; description: string; featureFlag?: string };
};

export function EventTypeEdit({ eventType }: EventTypeEditProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate: editEventType } = useMutation(
    async (modifiedEventType: EventTypeIn) => {
      const svix = new Svix(process.env.REACT_APP_SVIX_API_KEY as string);
      const { name, ...updateableProps } = modifiedEventType;
      const result = await svix.eventType.update(name, updateableProps);
      queryClient.invalidateQueries("eventTypes");
      return result;
    }
  );

  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit event type {eventType.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventTypeForm
              onClose={onClose}
              onSubmit={editEventType}
              initialValues={eventType}
              nameEditable={false}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
