import { SelectDropdown } from "./SelectDropdown";
import { SelectDropdownItem } from "./SelectDropdownItem";
import { useSelectLogic } from "./useSelectLogic";

export const BaseSelect = {
  useLogic: useSelectLogic,
  Dropdown: SelectDropdown,
  DropdownItem: SelectDropdownItem,
};
