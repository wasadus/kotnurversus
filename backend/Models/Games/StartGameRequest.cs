using Models.Rounds;
using Models.Specifications;

namespace Models.Games;

public class StartGameRequest
{
    public Guid GameId { get; set; }
    public List<Specification> Specifications { get; set; } = null!;
    public List<List<Participant>> Groups { get; set; } = null!;
    public Settings.Settings? Settings { get; set; }
}