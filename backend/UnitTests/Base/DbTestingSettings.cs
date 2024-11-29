using Vostok.Configuration.Abstractions.Attributes;

namespace UnitTests.Base;

public class DbTestingSettings
{
     [Required] public string DbConnectionString { get; set; }
}