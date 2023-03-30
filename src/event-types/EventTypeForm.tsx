import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { EventTypeIn, Svix } from "svix";
import { object, string } from "yup";

const initialValues = { name: "", description: "", featureFlag: "" };

const eventTypeSchema = object({
  name: string().required(),
  description: string().required(),
  featureFlag: string(),
});

export type EventTypeFormProps = {
  onClose: () => void;
};

export function EventTypeForm({ onClose }: EventTypeFormProps) {
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
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        createEventType(values);
        onClose();
      }}
      validationSchema={eventTypeSchema}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl isInvalid={!!errors.name && touched.name}>
              <FormLabel>Name</FormLabel>
              <Field as={Input} name="name" variant="filled"></Field>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.description && touched.description}
            >
              <FormLabel>Description</FormLabel>
              <Field as={Textarea} name="description" variant="filled"></Field>
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.featureFlag && touched.featureFlag}
            >
              <FormLabel>Feature Flag</FormLabel>
              <Field as={Input} name="featureFlag" variant="filled"></Field>
              <FormErrorMessage>{errors.featureFlag}</FormErrorMessage>
            </FormControl>
            <HStack>
              <Button
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Creating..."
              >
                Create
              </Button>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
            </HStack>
          </VStack>
        </form>
      )}
    </Formik>
  );
}
