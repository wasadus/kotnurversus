import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  Heading,
  useColorMode,
  useForceUpdate,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
  okText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onSubmit?: () => void;
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
  children?: ReactNode;
};

export const Alert = ({
  isOpen,
  onClose,
  heading = "Подтвердите действие",
  okText = "Подтвердить",
  cancelText = "Отмена",
  isLoading,
  onSubmit,
  submitProps,
  cancelProps,
  children,
}: Props) => {
  const { colorMode } = useColorMode();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const isMount = useRef(false);
  const forceUpdate = useForceUpdate();

  if (isOpen) {
    isMount.current = true;
  }

  if (!isMount.current) {
    return null;
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      preserveScrollBarGap
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onCloseComplete={() => {
        isMount.current = false;
        forceUpdate();
      }}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        bg={`bg.${colorMode}.1`}
        boxShadow="base"
        maxW={["90%", "90%", "600px"]}
        borderRadius={10}
      >
        <AlertDialogCloseButton />
        <AlertDialogHeader px={6} py={4}>
          <Heading
            fontSize="2xl"
            noOfLines={1}
            wordBreak="break-all"
            children={heading}
          />
        </AlertDialogHeader>
        <AlertDialogBody
          px={6}
          py={2}
          fontSize="normal"
          fontWeight="normal"
          whiteSpace="pre-line"
          children={children}
        />
        <AlertDialogFooter px={6} py={4} gap={4}>
          {cancelText?.trim() && (
            <Button
              ref={cancelRef}
              variant="ghost"
              isDisabled={isLoading}
              onClick={onClose}
              children={cancelText}
              {...cancelProps}
            />
          )}
          <Button
            variant="solid"
            colorScheme="red"
            isLoading={isLoading}
            onClick={onSubmit}
            children={okText}
            {...submitProps}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
