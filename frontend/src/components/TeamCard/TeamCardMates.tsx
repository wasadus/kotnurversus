import { ListProps, OrderedList } from "@chakra-ui/react";

export const TeamCardMates = (props: ListProps) => (
    <OrderedList
        m={0}
        px={{ base: 2, md: 4 }}
        py={{ base: 1.5, md: 2 }}
        spacing={1}
        borderTop="1px solid"
        borderColor="blackAlpha.400"
        _dark={{
            borderColor: "whiteAlpha.400",
        }}
        {...props}
    />
);