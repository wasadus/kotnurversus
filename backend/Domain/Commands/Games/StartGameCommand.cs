using Domain.Context;
using Domain.Helpers;
using Domain.Services.Games;
using Domain.Services.Rounds;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Models;
using Models.Games;
using Models.Rounds;
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

    public async Task<DomainResult<Game, InvalidGameDataReason>> RunAsync(Guid id, List<RoundCreationArgs> roundsToCreate)
    {
        var result = await dataContextAccessor.AccessDataAsync<DomainResult<Game, InvalidGameDataReason>>(
            async dbContext =>
            {
                var game = await gamesService.FindAsync(id);
                if (game == null)
                    return new ErrorInfo<InvalidGameDataReason>(InvalidGameDataReason.GameNotFound, "Game not found");

                if (!IsTreeCorrect(game, roundsToCreate))
                    return new ErrorInfo<InvalidGameDataReason>(InvalidGameDataReason.InvalidData, "Tree is not valid");

                await CreateAllTree(roundsToCreate);
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
                
                CreateRoundsForGame(game, parameters);
                
                return game;
            });
        return result;
    }

    private void CreateRoundsForGame(Game game, StartGameRequest parameters)
    {
        var countOfRounds = GetCountOfRoundsByGroups(parameters.Groups);
        var rounds = new List<Round>();
        var counter = 1;
        for (var i = parameters.Specifications.Count - 1; i > 2; i--)
        {
            rounds.Add(new Round()
            {
                GameId = game.Id,
                Order = countOfRounds - counter,
                Specification = parameters.Specifications[i],
                Participants = new List<Participant>()
            });
            counter++;
        }

        for (var i = parameters.Groups.Count - 1; i >= 0; i--)
        {
            var group = parameters.Groups[i];
            switch (group.Count)
            {
                case 2:
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[0],
                        Participants = new List<Participant>
                        {
                            group[0],
                            group[1]
                        }
                    });
                    counter++;
                    break;
                case 3:
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[0],
                        Participants = new List<Participant>
                        {
                            group[0],
                            group[1]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[1],
                        Participants = new List<Participant>
                        {
                            group[0],
                            group[2]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[2],
                        Participants = new List<Participant>
                        {
                            group[1],
                            group[2]
                        }
                    });
                    counter++;
                    break;
                case 4:
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[0],
                        Participants = new List<Participant>
                        {
                            group[0],
                            group[1]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[0],
                        Participants = new List<Participant>
                        {
                            group[2],
                            group[3]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[1],
                        Participants = new List<Participant>
                        {
                            group[0],
                            group[2]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[1],
                        Participants = new List<Participant>
                        {
                            group[1],
                            group[3]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[2],
                        Participants = new List<Participant>
                        {
                            group[0],
                            group[3]
                        }
                    });
                    counter++;
                    rounds.Add(new Round()
                    {
                        GameId = game.Id,
                        Order = countOfRounds - counter,
                        Specification = parameters.Specifications[2],
                        Participants = new List<Participant>
                        {
                            group[1],
                            group[2]
                        }
                    });
                    counter++;
                    break;
            }
        }
    }

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
            && parameters.Specifications.Count >= 4;
        
    }
    
    private async Task CreateAllTree(List<RoundCreationArgs> rounds) // TODO: научиться получать с фронта нормлаьное дерево, которое можно будет просто создать
    {
        var reversedRounds = rounds.OrderByDescending(x => x.Order).ToArray();
        var finalRound = reversedRounds[0].ToApiModel();
        finalRound.Id = Guid.NewGuid();
        await roundsService.AddAsync(finalRound);

        var parentRounds = new Queue<Round>(new[] {finalRound});
        var createdRounds = 1;
        var i = 1;

        while (createdRounds < rounds.Count)
        {
            var parentRound = parentRounds.Dequeue();
            var roundsToCreate = reversedRounds.Skip(i).Take(2).ToArray();
            for (int j = 0; j < 2; j++)
            {
                roundsToCreate[j].NextRoundId = parentRound.Id;
                var apiRound = roundsToCreate[j].ToApiModel();
                apiRound.Id = Guid.NewGuid();
                await roundsService.AddAsync(apiRound);
                parentRounds.Enqueue(apiRound);

                ++createdRounds;
            }

            i += 2;
        }
    }

    private bool IsTreeCorrect(Game game, List<RoundCreationArgs> rounds)
    {
        var finalRound = rounds.SingleOrDefault(x => x.NextRoundId == null); // финальный раунд один
        if (finalRound == null)
            return false;

        var isTeamsCountCorrect = IsNumberAPowOfTwo(game.Teams.Count); // количество команд это степень двойки
        if (!isTeamsCountCorrect)
            return false;

        var isRoundsCountCorrect = IsNumberAPowOfTwo(rounds.Count + 1); // количество раундов это степень двойки, большая нуля
        if (!isRoundsCountCorrect)
            return false;

        // ReSharper disable once ConditionIsAlwaysTrueOrFalseAccordingToNullableAPIContract
        var allRoundsHaveSpecs = rounds.All(x => x.Specification != null); // У всех раундов есть бизнес сценарии
        if (!allRoundsHaveSpecs)
            return false;

        var initialRoundWithTeamsCount = game.Teams.Count / 2;
        var isStartRoundsHaveTwoTeams = rounds
            .OrderBy(x => x.Order)
            .Take(initialRoundWithTeamsCount)
            .All(x => x.Participants!.Count == 2);

        return isStartRoundsHaveTwoTeams;
    }

    private static bool IsNumberAPowOfTwo(int n) => n > 0 && (n & (n - 1)) == 0;
}
