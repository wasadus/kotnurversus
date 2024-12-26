import { LinkProps } from "@chakra-ui/react";
import { Link as BaseLink } from "~/components/Link";

export const Link = (props: LinkProps) => (
    <BaseLink
        {...props}
        px={{ base: 2, md: 4, xl: 6 }}
        py={2}
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="semibold"
        borderRadius="full"
        _hover={{ color: "secondary", borderColor: "secondary" }}
    />
);