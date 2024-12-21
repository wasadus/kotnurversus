import { Center, FlexProps, Spinner, SpinnerProps } from "@chakra-ui/react";

type Props = {
  spinnerProps?: SpinnerProps;
} & FlexProps;

export const Loading = ({ spinnerProps, ...props }: Props) => (
  <Center {...props}>
    <Spinner size="lg" {...spinnerProps} />
  </Center>
);
