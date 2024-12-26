import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import { paths } from "~/pages/paths";
import { useAuthContext } from "~/utils/auth-context";
import { ActionButton } from "~/components/PageLayout/ActionButton.tsx";
import { AuthWindow } from "~/components/PageLayout/AuthWindow.tsx";

export const AuthButton = () => {
  const window = useDisclosure();
  const { isAuthenticated } = useAuthContext();
  const breakpoint = useBreakpoint(["base", "md", "xl"]);

  if (breakpoint === "base") {
    return null;
  }

  if (isAuthenticated) {
    return (
      <ActionButton
        as={Link}
        display="flex"
        to={paths.profile.path}
        children={breakpoint === "xl" ? "Профиль организатора" : "Профиль"}
      />
    );
  }

  return (
    <>
      <ActionButton
        {...window.getButtonProps()}
        onClick={window.onOpen}
        children="Войти как организатор"
      />
      <AuthWindow
        {...window.getDisclosureProps()}
        isOpen={window.isOpen}
        onClose={window.onClose}
      />
    </>
  );
};
