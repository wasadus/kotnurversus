using Microsoft.Extensions.DependencyInjection;
using Vostok.Configuration;
using Vostok.Configuration.Sources.Json;

namespace UnitTests.Base;

public static class ConfigurationHelper
{
    public static IServiceCollection UseConfiguration(this IServiceCollection services, string filePath)
    {
        var provider = new ConfigurationProvider();

        provider.SetupSourceFor<DbTestingSettings>(new JsonFileSource(filePath));

        var settings = provider.Get<DbTestingSettings>();

        return services.AddSingleton(settings);
    }
}