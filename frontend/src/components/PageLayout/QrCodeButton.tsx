import {
  Button,
  SlideFade,
  useBoolean,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Window } from "~/components/Window";
import { QrCode } from "~/components/PageLayout/QrCode";

export const QrCodeButton = () => {
  const [isShow, setIsShow] = useBoolean(false);
  const isLarge = useBreakpointValue(
    { base: false, "2xl": true },
    { ssr: false }
  );

  return (
    <>
      <Button
        w="220px"
        variant="link"
        color="#808080"
        fontWeight="normal"
        textDecoration="underline"
        _hover={{
          color: "text.light.main",
          _dark: { color: "text.dark.main" },
        }}
        onClick={setIsShow.toggle}
        children={`${isShow ? "Скрыть" : "Показать"} QR-код страницы`}
      />
      {isLarge ? (
        <SlideFade
          in={isShow}
          unmountOnExit
          style={{ position: "fixed", right: "40px", bottom: "40px" }}
        >
          <QrCode size={156} />
        </SlideFade>
      ) : (
        <Window
          isHideSubmit
          isHideCancel
          isOpen={isShow}
          onClose={setIsShow.off}
        >
          <QrCode m={10} p={4} size={256} />
        </Window>
      )}
    </>
  );
};
