import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useSvixClient } from "../utils/svixClient.context";

export type EventTypeArchiveProps = {
  eventTypeName: string;
};

export function EventTypeArchive({ eventTypeName }: EventTypeArchiveProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const svixClient = useSvixClient();

  const { mutate: archiveEventType, isLoading } = useMutation(async () => {
    const result = await svixClient.eventType.delete(eventTypeName);
    queryClient.invalidateQueries("eventTypes");
    return result;
  });

  const handleConfirmClick = () => {
    archiveEventType();
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={onOpen}>
        Archive
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Heading as="h3" size="sm">
                Are you sure want to delete the following event type?
              </Heading>
              <Tag>{eventTypeName}</Tag>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleConfirmClick}
              isLoading={isLoading}
              loadingText="Deleting..."
            >
              Confirm
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
