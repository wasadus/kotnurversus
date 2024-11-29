using System.Reflection;
using Db;
using Domain.Commands.Games;
using KotnurVersus.Web.Helpers;
using KotnurVersus.Web.Helpers.DI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Vostok.Configuration;
using Vostok.Configuration.Sources.Json;
using Vostok.Logging.Abstractions;
using Vostok.Logging.Console;
using DbContext = Db.DbContext;

namespace UnitTests.Base;


public class TestsBase
{
    protected ServiceProvider Provider;
    [OneTimeSetUp]
    public void SetUp()
    {
        var services = new ServiceCollection();
        services.AddApplicationServices(
            new ConsoleLog(),
            [
                typeof(DbContext).Assembly,
                typeof(IStartGameCommand).Assembly
            ],
            []);
        var configurationProvider = new ConfigurationProvider();
        configurationProvider.SetupSourceFor<DbTestingSettings>(new JsonFileSource("settings/config.json"));

        var settings = configurationProvider.Get<DbTestingSettings>();
        
        services.AddSingleton<IDbContextFactory>(new TestingDbContextFactory(settings));
        services.AddSingleton<ILog, ConsoleLog>();
        Provider = services.BuildServiceProvider();
    }

    [OneTimeTearDown]
    public void TearDown()
    {
        var context = Provider.GetService<DbContext>();
        context?.Database.EnsureDeleted();
        context?.Dispose();
        Provider.Dispose();
    }
}