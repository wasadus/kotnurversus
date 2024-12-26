import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { paths } from "~/pages/paths.tsx";
import { OutlinePlusIcon } from "~/icons/OutlinePlusIcon.tsx";

export const CreateTourneyButton = () => (
    <Button
        as={Link}
        size="lg"
        colorScheme="teal"
        to={paths.createTourney.path}
        leftIcon={<OutlinePlusIcon boxSize={6} />}
        children="Создать турнир"
    />
);