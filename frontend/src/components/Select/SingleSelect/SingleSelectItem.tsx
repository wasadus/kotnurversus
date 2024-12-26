import { Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { BaseSelect } from "../BaseSelect";
import { DropdownItemProps } from "../BaseSelect/SelectDropdownItem";
import { SelectValue } from "../types";

export const SingleSelectItem = <T extends SelectValue>(props: DropdownItemProps<T>) =>
  useMemo(() => {
    return (
      <BaseSelect.DropdownItem
        {...props}
        children={
          <Text
            w="full"
            fontSize="sm"
            noOfLines={1}
            wordBreak="break-all"
            children={props.option.label}
          />
        }
      />
    );
  }, [props.isChosen, props.option.value]);
