import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  lineHeight: "normal",
});

export const textTheme = defineStyleConfig({
  baseStyle,
});
