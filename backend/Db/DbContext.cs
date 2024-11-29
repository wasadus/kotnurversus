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
    public DbContext(DbContextOptions options) : base(options)
    {
        
    }
    public DbSet<UserDbo> Users { get; set; } = null!;
    public DbSet<RoundDbo> Rounds { get; set; } = null!;
    public DbSet<GameDbo> Games { get; set; } = null!;
    public DbSet<ChallengeDbo> Challenges { get; set; } = null!;
    public DbSet<SnapshotChallengeDbo> SnapshotChallenges { get; set; } = null!;
    public DbSet<CategoryDbo> Categories { get; set; } = null!;

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
        
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.ClrType.GetProperties())
            {
                if (property.PropertyType.IsGenericType && 
                    property.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                {
                    // Устанавливаем тип данных JSON
                    modelBuilder.Entity(entityType.ClrType)
                        .Property(property.Name)
                        .HasColumnType("jsonb");
                }
            }
        }
    }
}