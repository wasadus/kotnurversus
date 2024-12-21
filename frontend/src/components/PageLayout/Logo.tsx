import { useAuthContext } from "~/utils/auth-context";
import { Text, useBreakpointValue } from "@chakra-ui/react";
import { Link as BaseLink } from "~/components/Link";
import { paths } from "~/pages/paths";

export const Logo = () => {
    const { isAuthenticated } = useAuthContext();
    const logoLabel = useBreakpointValue(
        {
            base: "К",
            md: isAuthenticated ? "К" : "Котнур",
            lg: "Котнур",
        },
        { ssr: false }
    );

    return (
        <BaseLink href={paths.main.path} _hover={{ transform: "scale(1.025)" }}>
            <Text
                as="span"
                color="secondary"
                fontSize={{ base: "xl", md: "32px" }}
                fontWeight="semibold"
                children={logoLabel}
            />
            <Text
                ml={0.5}
                as="span"
                fontSize={{ base: "xl", md: "32px" }}
                fontWeight="medium"
            >
                Версус
            </Text>
        </BaseLink>
    );
};