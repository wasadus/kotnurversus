import { numberInputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { inputTheme } from "./input";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const numberInputTheme = defineMultiStyleConfig({
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps,
});
