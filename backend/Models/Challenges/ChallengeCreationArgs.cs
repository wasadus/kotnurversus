namespace Models.Challenges;

public class ChallengeCreationArgs : EntityCreationArgs
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? ShortDescription { get; set; }
    public ChallengeDifficulty Difficulty { get; set; }
    public Guid CategoryId { get; set; }
    public bool IsCatInBag { get; set; }
}