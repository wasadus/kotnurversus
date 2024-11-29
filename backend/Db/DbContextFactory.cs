using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Db;

public class DbContextFactory: IDbContextFactory
{
    private readonly IDbSettings dbSettings;

    public DbContextFactory(IDbSettings dbSettings)
    {
        this.dbSettings = dbSettings;
    }

    public DbContext CreateDbContext()
    {
        var optionsBuilder = new DbContextOptionsBuilder<DbContext>();
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(dbSettings.ConnectionString);
        dataSourceBuilder.UseJsonNet();
        optionsBuilder.UseNpgsql(dataSourceBuilder.Build(), o => o.EnableRetryOnFailure(dbSettings.MaxRetryOnFailureCount));
        return new DbContext(optionsBuilder.Options);
    }
}