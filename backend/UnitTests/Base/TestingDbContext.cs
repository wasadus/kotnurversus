using Db;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using DbContext = Db.DbContext;

namespace UnitTests.Base;

public class TestingDbContextFactory : IDbContextFactory
{
    private readonly DbTestingSettings settings;

    public TestingDbContextFactory(DbTestingSettings settings)
    {
        this.settings = settings;
    }
    public DbContext CreateDbContext()
    {
        var optionsBuilder = new DbContextOptionsBuilder<DbContext>();
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(settings.DbConnectionString);
        dataSourceBuilder.UseJsonNet();
        optionsBuilder.UseNpgsql(dataSourceBuilder.Build());
        var context = new DbContext(optionsBuilder.Options);
        context.Database.EnsureCreated();
        return context;
    }
}