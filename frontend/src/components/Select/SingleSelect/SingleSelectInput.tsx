import { HStack, Spinner } from "@chakra-ui/react";
import { forwardRef } from "react";
import IconButtonWithTooltip from "~/components/IconButtonWithTooltip";
import Input, { InputProps } from "~/components/Input";
import ArrowDownIcon from "~/icons/ArrowDownIcon";
import CrossIcon from "~/icons/CrossIcon";

type Props = {
  isDropdownOpen?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isShowClear?: boolean;
  onClear?: () => void;
} & InputProps;

const SingleSelectInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      isDropdownOpen,
      isLoading,
      isDisabled,
      isShowClear,
      placeholder,
      onClear,
      rightElement,
      ...inputProps
    },
    ref
  ) => (
    <Input
      {...inputProps}
      ref={ref}
      pr={rightElement ? "76px" : 10}
      isDisabled={isDisabled}
      placeholder={isLoading ? "Загрузка..." : placeholder}
      rightElementProps={{
        w: rightElement ? "76px" : 10,
        pointerEvents: isShowClear ? undefined : "none",
      }}
      rightElement={
        isLoading ? (
          <Spinner size="sm" />
        ) : isShowClear ? (
          <HStack>
            {rightElement}
            <IconButtonWithTooltip
              size="xs"
              variant="ghost"
              icon={<CrossIcon boxSize={5} />}
              isDisabled={isDisabled}
              onClick={onClear}
              label="Очистить"
            />
          </HStack>
        ) : (
          <ArrowDownIcon
            boxSize={6}
            transition="ease-in-out 300ms"
            transform={`rotate(${isDropdownOpen ? -180 : 0}deg)`}
          />
        )
      }
    />
  )
);

export default SingleSelectInput;
