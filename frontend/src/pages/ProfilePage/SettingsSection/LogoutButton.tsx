import { Button, ButtonProps } from "@chakra-ui/react";
import { useAuthContext } from "~/utils/auth-context.tsx";

export const LogoutButton = (props: ButtonProps) => {
    const { onLogout } = useAuthContext();

    return (
        <Button
            {...props}
            p={2}
            variant="link"
            colorScheme="red"
            onClick={onLogout}
            children="Выйти из аккаунта"
        />
    );
};