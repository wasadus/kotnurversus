import { TourneyTeam } from "~/types/tourney.ts";
import { BoxProps, ListItem, Text } from "@chakra-ui/react";
import { TeamCardLayout } from "~/components/TeamCard/TeamCardLayout.tsx";
import { TeamCardTitle } from "~/components/TeamCard/TeamCardTitle.tsx";
import { TeamCardMates } from "~/components/TeamCard/TeamCardMates.tsx";

export type BaseTeamCardProps = {
    team: Partial<TourneyTeam>;
} & BoxProps;

export const BaseTeamCard = ({ team, ...props }: BaseTeamCardProps) => (
    <TeamCardLayout {...props}>
        <TeamCardTitle>
            <Text
                fontSize={{ base: "md", md: "lg" }}
                noOfLines={1}
                wordBreak="break-all"
                children={team?.title || "???"}
            />
        </TeamCardTitle>
        <TeamCardMates>
            {team?.mates?.map((p, i) => (
                <ListItem ml={4} key={i} fontSize={{ base: "sm", md: "md" }}>
                    <Text noOfLines={1} wordBreak="break-all" children={p} />
                </ListItem>
            ))}
            {!team?.mates?.length && (
                <Text
                    py={{ base: 6, md: 10 }}
                    opacity={0.75}
                    textAlign="center"
                    fontSize={{ base: "sm", md: "md" }}
                    children="Участники не указаны"
                />
            )}
        </TeamCardMates>
    </TeamCardLayout>
);