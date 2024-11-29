using System.Reflection;
using Db;
using Domain.Commands;
using Domain.Commands.Games;
using Domain.Services.Rounds;
using KotnurVersus.Web.Helpers.DI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.DependencyInjection;
using Models.Games;
using Models.Rounds;
using Models.Settings;
using Models.Specifications;
using UnitTests.Base;

namespace UnitTests;

public class RoundsTests : TestsBase
{
    private IStartGameCommand startGameCommand;
    private ICreateCommand<Game, GameCreationArgs, InvalidGameDataReason> createGameCommand;

    [SetUp]
    public void Setup()
    {
        startGameCommand = Provider.GetService<IStartGameCommand>();
        createGameCommand = Provider.GetService<ICreateCommand<Game, GameCreationArgs, InvalidGameDataReason>>();
    }

    [Test]
    public async Task Simple()
    {
        var gameId = Guid.NewGuid();
        var creationArgs = new GameCreationArgs
        {
            Description = "Some me",
            Title = $"Im Bob Cat {Guid.NewGuid()}",
            StartDate = DateTimeOffset.Now,
            Settings = new Settings(),
            Form = GameForm.Online,
        };
        await createGameCommand.RunAsync(gameId, creationArgs, default);
        var startGameRequest = new StartGameRequest
        {
            GameId = gameId,
            Specifications = GenerateSpecifications(10),
            Groups = new List<List<Participant>>
            {
                GenerateTeams(2),
                GenerateTeams(2),
                GenerateTeams(3),
                GenerateTeams(4)
            },
            Settings = new Settings()
        };
        await startGameCommand.RunAsync(gameId, startGameRequest);
        Assert.Pass();
    }
    
    private static List<Specification> GenerateSpecifications(int count)
    {
        var result = new List<Specification>();
        for (var i = 0; i < count; i++)
        {
            result.Add(new()
            {
                Title = Guid.NewGuid().ToString(),
                BusinessDescription = Guid.NewGuid().ToString(),
                TechDescription = Guid.NewGuid().ToString(),
            });
        }

        return result;
    }
    
    private static List<Participant> GenerateTeams(int count)
    {
        var result = new List<Participant>();
        for (var i = 0; i < count; i++)
        {
            result.Add(new()
            {
                Order = 0,
                TeamId = Guid.NewGuid()
            });
        }

        return result;
    }
}