import { useAuthContext } from "~/utils/auth-context";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import { paths } from "~/pages/paths";
import { Link } from "~/components/PageLayout/Link";

export const ChallengesLink = () => {
    const { isAuthenticated } = useAuthContext();
    const breakpoint = useBreakpoint(["base", "md", "lg"]);

    if (!isAuthenticated || breakpoint === "base") {
        return null;
    }

    return (
        <Link
            href={paths.challenges.path}
            children={breakpoint === "lg" ? "Доп. требования" : "Требования"}
        />
    );
};