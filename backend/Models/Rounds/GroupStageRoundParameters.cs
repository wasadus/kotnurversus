namespace Models.Rounds;

public class GroupStageRoundParameters
{
    public int FirstTeamIndex;
    public int SecondTeamIndex;
    public int SpecificationIndex;

    public GroupStageRoundParameters(int firstTeamIndex, int secondTeamIndex, int specificationIndex)
    {
        FirstTeamIndex = firstTeamIndex;
        SecondTeamIndex = secondTeamIndex;
        SpecificationIndex = specificationIndex;
    }
}