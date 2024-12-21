import { TourneyTeam } from "~/types/tourney.ts";
import { Box, BoxProps, forwardRef, Text } from "@chakra-ui/react";

type BaseTeamProps = {
    team: TourneyTeam;
    bodyProps?: BoxProps;
} & BoxProps;

export const BaseTeam = forwardRef<BaseTeamProps, "div">(
    ({ team, bodyProps, _dark, ...props }, ref) => (
        <Box ref={ref} textAlign="center" {...props}>
            <Text
                my={1}
                opacity={0.75}
                fontSize={{ base: "xs", sm: "sm" }}
                children="Команда"
            />
            <Box
                id="team-body"
                px={4}
                py={2}
                w="full"
                h="fit-content"
                border="1px solid"
                bg="blackAlpha.50"
                borderColor="blackAlpha.50"
                borderRadius={8}
                {...bodyProps}
                _dark={{
                    bg: "whiteAlpha.50",
                    borderColor: "whiteAlpha.50",
                    ...bodyProps?._dark,
                }}
            >
                <Text
                    fontSize={{ base: "sm", sm: "lg" }}
                    fontWeight="medium"
                    noOfLines={1}
                    wordBreak="break-all"
                    children={team.title}
                />
            </Box>
        </Box>
    )
);