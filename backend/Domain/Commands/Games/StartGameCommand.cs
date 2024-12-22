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
                                value = GameState.InProgress
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
        var countOfRounds = GetCountOfRoundsByGroups(parameters.Groups);
        var offsetFromEnd = 1;

        var finalRoundId = (await CreateRound(game.Id, parameters, countOfRounds, parameters.Specifications[^1])).Id;
        var parentRoundId = finalRoundId;

        // todo: а может разбить этот метод на два этапа?
        // 1. Формирование раунда без учета порядка + следующего раунда
        // 2. Установка правильного порядка и следующего раунда
        // 3. Сохранение изменений
        for (var i = parameters.Specifications.Count - 2; i > 2; i--)
        {
            parentRoundId = (await CreateRound(game.Id, parameters, countOfRounds - offsetFromEnd, parameters.Specifications[i], parentRoundId)).Id;
            offsetFromEnd++;
        }

        for (var i = parameters.Groups.Count - 1; i >= 0; i--)
        {
            var group = parameters.Groups[i];

            switch (group.Count)
            {
                case 2:
                {
                    var rules = GroupStageRules[2];
                    foreach (var rule in rules)
                    {
                        parentRoundId = 
                        (
                            await CreateRound(
                            game.Id,
                            parameters,
                            countOfRounds - offsetFromEnd,
                            parameters.Specifications[rule.SpecificationIndex],
                            parentRoundId,
                            (group[rule.FirstTeamIndex], group[rule.SecondTeamIndex]))
                        ).Id;
                    
                        offsetFromEnd++;
                    }
                    break;
                }
                case 3:
                {
                    var rules = GroupStageRules[3];
                    foreach (var rule in rules)
                    {
                        parentRoundId = 
                        (
                            await CreateRound(
                            game.Id,
                            parameters,
                            countOfRounds - offsetFromEnd,
                            parameters.Specifications[rule.SpecificationIndex],
                            parentRoundId,
                            (group[rule.FirstTeamIndex], group[rule.SecondTeamIndex]))
                        ).Id;
                        offsetFromEnd++;
                    }
                    break;
                }
                case 4:
                {
                    var rules = GroupStageRules[4];
                    foreach (var rule in rules)
                    {
                        parentRoundId = 
                        (
                            await CreateRound(
                            game.Id,
                            parameters,
                            countOfRounds - offsetFromEnd,
                            parameters.Specifications[rule.SpecificationIndex],
                            parentRoundId,
                            (group[rule.FirstTeamIndex], group[rule.SecondTeamIndex]))
                        ).Id;
                        offsetFromEnd++;
                    }
                    break;
                }
            }
        }
    }

    private async Task<Round> CreateRound(
        Guid gameId, 
        StartGameRequest parameters, 
        int order, 
        Specification specification, 
        Guid? nextRoundId = null, 
        (Participant first, Participant second)? participants = null)
    {
        var round = new Round
        {
            GameId = gameId,
            Participants = participants.HasValue ? [participants.Value.first, participants.Value.second] : [],
            Specification = specification,
            Settings = parameters.Settings,
            Order = order,
            NextRoundId = nextRoundId,
            Id = Guid.NewGuid(),
        };
        await roundsService.AddAsync(round);
        
        return round;
        
    }

    // todo: метод нуждается в unit-тестировании. Хорошо бы его вынести в какой-нибудь хелпер
    private int GetCountOfRoundsByGroups(List<List<Participant>> groups)
    {
        var count = 0;
        foreach (var group in groups)
        {
            switch (group.Count)
            {
                case 2:
                    count += 1;
                    break;
                case 3:
                    count += 3;
                    break;
                case 4:
                    count += 6;
                    break;
            }
        }

        count += 2 * (groups.Count - 1) + 1; // 1 => 1 round, 2 => 3 rounds, 4 => 7 rounds
        
        return count;
        
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
