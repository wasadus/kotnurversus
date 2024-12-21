import { useAuthContext } from "~/utils/auth-context";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { paths } from "~/pages/paths";
import { OutlinePlusIcon } from "~/icons/OutlinePlusIcon";

export const CreateTourneyButton = () => {
    const { isAuthenticated } = useAuthContext();
    const isDesktop = useBreakpointValue(
        { base: false, sm: true },
        { ssr: false }
    );

    if (!(isAuthenticated && isDesktop)) {
        return null;
    }

    return (
        <Button
            as={Link}
            size="lg"
            colorScheme="teal"
            to={paths.createTourney.path}
            leftIcon={<OutlinePlusIcon boxSize={6} />}
            children="Создать турнир"
        />
    );
};