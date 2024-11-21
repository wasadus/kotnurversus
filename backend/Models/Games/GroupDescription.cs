using Models.Rounds;
using Models.Specifications;

namespace Models.Games;

public class GroupDescription
{
    public List<Participant> Teams { get; set; } = null!;
    public List<Specification> Specifications { get; set; } = null!;
}