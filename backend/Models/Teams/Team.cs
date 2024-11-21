namespace Models.Teams;

public class Team
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public List<string> Mates { get; set; } = new();
    public int Score { get; set; }
    public int WonGroupMatches { get; set; }
    public int Order { get; set; }
}