using Db.Dbo.Categories;
using Db.Dbo.Challenges;
using Db.Dbo.Games;
using Db.Dbo.Rounds;
using Db.Dbo.Users;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Db;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    private readonly IDbSettings settings;

    public DbContext(IDbSettings settings)
    {
        this.settings = settings;
    }

    public DbSet<UserDbo> Users { get; set; } = null!;
    public DbSet<RoundDbo> Rounds { get; set; } = null!;
    public DbSet<GameDbo> Games { get; set; } = null!;
    public DbSet<ChallengeDbo> Challenges { get; set; } = null!;
    public DbSet<SnapshotChallengeDbo> SnapshotChallenges { get; set; } = null!;
    public DbSet<CategoryDbo> Categories { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(settings.ConnectionString);
        dataSourceBuilder.UseJsonNet();
        builder.UseNpgsql(dataSourceBuilder.Build(), o => o.EnableRetryOnFailure(settings.MaxRetryOnFailureCount));
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<DateTimeOffset>()
            .HaveConversion<DateTimeOffsetConverter>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var user = modelBuilder.Entity<UserDbo>();
        user.HasKey(x => x.Id);
        user.HasIndex(x => x.Email).IsUnique();

        var challenge = modelBuilder.Entity<ChallengeDbo>();
        challenge.HasKey(x => x.Id);
        challenge.HasIndex(x => new {x.Title, Theme = x.CategoryId}).IsUnique();
        
        var snapshotChallenge = modelBuilder.Entity<SnapshotChallengeDbo>();
        snapshotChallenge.HasKey(x => new{x.Id, x.GameId, x.RoundId});
        snapshotChallenge.HasIndex(x => new {x.Id, x.GameId, x.RoundId}).IsUnique();
    }
}