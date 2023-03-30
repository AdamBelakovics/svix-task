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
import { EventTypeIn } from "svix";
import { object, string } from "yup";

const eventTypeSchema = object({
  name: string().required(),
  description: string().required(),
  featureFlag: string(),
});

export type EventTypeFormProps = {
  onClose: () => void;
  onSubmit: (eti: EventTypeIn) => void;
  initialValues?: { name: string; description: string; featureFlag?: string };
  nameEditable?: boolean;
};

export function EventTypeForm({
  onClose,
  onSubmit,
  initialValues = { name: "", description: "", featureFlag: "" },
  nameEditable = true,
}: EventTypeFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        // Todo replace with generic sanitization
        const sanitizedValues = {
          ...values,
          featureFlag:
            values.featureFlag === "" ? undefined : values.featureFlag,
        };
        onSubmit(sanitizedValues);
        onClose();
      }}
      validationSchema={eventTypeSchema}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl
              isInvalid={!!errors.name && touched.name}
              isDisabled={!nameEditable}
            >
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
                loadingText="Saving..."
              >
                Save
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
