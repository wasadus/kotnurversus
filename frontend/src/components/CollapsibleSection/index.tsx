import {
  Box,
  BoxProps,
  Collapse,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { storageClient as storage } from "~/utils/storage";
import { CollapsibleHeader } from "~/components/CollapsibleSection/CollapsibleHeader";

type Props = {
  label: string;
  storageKey?: string;
  defaultIsOpen?: boolean;
  headerProps?: BoxProps;
} & BoxProps;

export const CollapsibleSection = ({
  label,
  storageKey,
  defaultIsOpen = true,
  headerProps,
  children,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useBoolean(() =>
    storageKey && storage.has(storageKey, { isSession: true })
      ? storage.getBoolean(storageKey, { isSession: true })
      : defaultIsOpen
  );

  useEffect(() => {
    if (!storageKey) return;
    storage.set(storageKey, String(isOpen), { isSession: true });
  }, [isOpen, storageKey]);

  return (
    <Box {...props}>
      <CollapsibleHeader
        label={label}
        isOpen={isOpen}
        onToggle={setIsOpen.toggle}
        {...headerProps}
      />
      <Collapse in={isOpen} unmountOnExit children={children} />
    </Box>
  );
};
