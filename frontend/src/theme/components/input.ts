import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const $height = cssVar("input-height");
const $fontSize = cssVar("input-font-size");
const $padding = cssVar("input-padding");
const $borderRadius = cssVar("input-border-radius");

const baseStyle = definePartsStyle({
  addon: {
    height: $height.reference,
    fontSize: $fontSize.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
  },
  field: {
    width: "100%",
    height: $height.reference,
    fontSize: $fontSize.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

const size = {
  lg: defineStyle({
    [$fontSize.variable]: "fontSizes.lg",
    [$padding.variable]: "space.4",
    [$borderRadius.variable]: "radii.md",
    [$height.variable]: "sizes.12",
  }),
  md: defineStyle({
    [$fontSize.variable]: "fontSizes.md",
    [$padding.variable]: "space.4",
    [$borderRadius.variable]: "radii.md",
    [$height.variable]: "sizes.10",
  }),
  sm: defineStyle({
    [$fontSize.variable]: "fontSizes.sm",
    [$padding.variable]: "space.3",
    [$borderRadius.variable]: "radii.sm",
    [$height.variable]: "sizes.8",
  }),
  xs: defineStyle({
    [$fontSize.variable]: "fontSizes.xs",
    [$padding.variable]: "space.2",
    [$borderRadius.variable]: "radii.sm",
    [$height.variable]: "sizes.6",
  }),
};

const sizes = {
  lg: definePartsStyle({
    field: size.lg,
    group: size.lg,
  }),
  md: definePartsStyle({
    field: size.md,
    group: size.md,
  }),
  sm: definePartsStyle({
    field: size.sm,
    group: size.sm,
  }),
  xs: definePartsStyle({
    field: size.xs,
    group: size.xs,
  }),
};

const getDefaults = (props: Record<string, string>) => {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  };
};

const variantPrimary = definePartsStyle((props) => {
  const { focusBorderColor, errorBorderColor } = getDefaults(props);

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("blackAlpha.50", "whiteAlpha.50")(props),
      _hover: {
        borderColor: mode("blackAlpha.50", "whiteAlpha.50")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _placeholder: {
        color: mode("blackAlpha.500", "whiteAlpha.500")(props),
      },
      _invalid: {
        borderColor: errorBorderColor,
      },
      _focusVisible: {
        borderColor: focusBorderColor,
      },
    },
    addon: {
      bg: mode("blackAlpha.100", "whiteAlpha.100")(props),
    },
    element: {
      color: mode("blackAlpha.700", "whiteAlpha.700")(props),
    },
  };
});

const variants = {
  primary: variantPrimary,
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});
