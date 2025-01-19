using Domain.Context;
using Domain.Services.Games;
using Domain.Services.Rounds;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Models;
using Models.Games;
using Models.Rounds;
using Models.Specifications;
using Newtonsoft.Json.Serialization;

namespace Domain.Commands.Games;

public class StartGameCommand : IStartGameCommand
{
    private readonly IDataContextAccessor dataContextAccessor;
    private readonly IGamesService gamesService;
    private readonly IRoundsService roundsService;

    public StartGameCommand(
        IDataContextAccessor dataContextAccessor,
        IGamesService gamesService,
        IRoundsService roundsService)
    {
        this.dataContextAccessor = dataContextAccessor;
        this.gamesService = gamesService;
        this.roundsService = roundsService;
    }

    public async Task<DomainResult<Game, InvalidGameDataReason>> RunAsync(Guid id, StartGameRequest parameters)
    {
        var result = await dataContextAccessor.AccessDataAsync<DomainResult<Game, InvalidGameDataReason>>(
            async dbContext =>
            {
                var game = await gamesService.FindAsync(id);
                if (game == null)
                    return new ErrorInfo<InvalidGameDataReason>(InvalidGameDataReason.GameNotFound, "Game not found");
                
                if (!ValidateParameters(parameters))
                    return new ErrorInfo<InvalidGameDataReason>(InvalidGameDataReason.InvalidData, "Invalid parameters");
                
                await CreateRoundsForGame(game, parameters);
                await gamesService.PatchAsync(
                    game,
                    new JsonPatchDocument<Game>(
                        new List<Operation<Game>>()
                        {
                            new()
                            {
                                op = "replace",
                                path = "/state",
                                value = GameState.GroupStageInProgress
                            }
                        },
                        new DefaultContractResolver()));

                await dbContext.SaveChangesAsync();

                return game;
            });
        return result;
    }

    private static readonly Dictionary<int, GroupStageRoundParameters[]> GroupStageRules = new()
    {
        [2] =
        [
            new GroupStageRoundParameters(0, 1, 0)
        ],
        [3] =
        [
            new GroupStageRoundParameters(0, 1, 0),
            new GroupStageRoundParameters(1, 2, 1),
            new GroupStageRoundParameters(0, 2, 2)
        ],
        [4] =
        [
            new GroupStageRoundParameters(0, 1, 0),
            new GroupStageRoundParameters(2, 3, 0),
            new GroupStageRoundParameters(0, 2, 1),
            new GroupStageRoundParameters(1, 3, 1)
        ]
    };

    private async Task CreateRoundsForGame(Game game, StartGameRequest parameters)
    {
        var rounds = new List<Round>();

        for (var i = 3; i < parameters.Specifications.Count; i++)
        {
            rounds.Add(CreateRound(game.Id, parameters, parameters.Specifications[i], Stage.Playoff));
        }

        foreach (var group in parameters.Groups)
        {
            var rules = GroupStageRules[group.Count];

            foreach (var rule in rules)
            {
                rounds.Add(
                    CreateRound(
                        game.Id,
                        parameters,
                        parameters.Specifications[rule.SpecificationIndex],
                        Stage.GroupStage,
                        (group[rule.FirstTeamIndex], group[rule.SecondTeamIndex])));
            }
        }

        rounds.Reverse();

        for (var i = 0; i < rounds.Count - 1; i++)
        {
            var round = rounds[i];
            round.Order = i + 1;
            round.NextRoundId = rounds[i + 1].Id;
        }
        rounds[^1].Order = rounds.Count;

        foreach (var round in rounds)
        {
            await roundsService.AddAsync(round);
        }
        //todo
        //await roundsService.AddRange(rounds);
    }

    private Round CreateRound(
        Guid gameId, 
        StartGameRequest parameters, 
        Specification specification,
        Stage stage,
        (Participant first, Participant second)? participants = null)
    {
        var round = new Round
        {
            GameId = gameId,
            Participants = participants.HasValue ? [participants.Value.first, participants.Value.second] : [],
            Specification = specification,
            Settings = parameters.Settings,
            Id = Guid.NewGuid(),
            Stage = stage
        };

        return round;
    }

    private bool ValidateParameters(StartGameRequest parameters)
    {
        return IsNumberAPowOfTwo(parameters.Groups.Count)
            && parameters.Groups.All(x => x.Count >= 2)
            && parameters.Groups.Count <= 4
            && parameters.Specifications.Count >= 4;
    }

    private static bool IsNumberAPowOfTwo(int n) => n > 0 && (n & (n - 1)) == 0;
}
