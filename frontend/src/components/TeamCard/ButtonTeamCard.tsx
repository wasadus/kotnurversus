import { MouseEvent } from "react";
import { Box } from "@chakra-ui/react";
import { BaseTeamCard, BaseTeamCardProps } from "~/components/TeamCard/BaseTeamCard.tsx";

type ButtonTeamCardProps = {
    isChosen?: boolean;
    isDisabled?: boolean;
    activeColor: string;
    onChoose?: (teamId: string) => void;
} & BaseTeamCardProps;

export const ButtonTeamCard = ({
                            isChosen,
                            isDisabled,
                            activeColor,
                            onChoose,
                            onClick,
                            team,
                            ...props
                        }: ButtonTeamCardProps) => {
    const hoverProps = {
        borderColor: activeColor,
        _dark: { borderColor: activeColor },
    };
    const activeProps = {
        ...hoverProps,
        boxShadow: `0px 0px 20px 0px ${activeColor}`,
    };

    if (isDisabled) {
        return (
            <BaseTeamCard team={team} {...(isChosen ? activeProps : {})} {...props} />
        );
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (onClick) return onClick(e);
        if (team.id) return onChoose?.(team.id);
    };

    return (
        <Box
            as="button"
            w="full"
            maxW={{ base: "175px", md: "250px" }}
            outline="none"
            textAlign="start"
            _hover={{ "#card": hoverProps }}
            _focusVisible={{ "#card": hoverProps }}
            onClick={handleClick}
            {...props}
        >
            <BaseTeamCard
                id="card"
                team={team}
                transition={["border", "box-shadow"]
                    .map((x) => `${x} 200ms ease-out`)
                    .join(", ")}
                {...(isChosen ? activeProps : {})}
            />
        </Box>
    );
};