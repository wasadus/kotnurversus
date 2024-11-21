using Models.Games;

namespace Domain.Commands.Games;

public interface IStartGameCommand
{
    Task<DomainResult<Game, InvalidGameDataReason>> RunAsync(Guid id, StartGameRequest parameters);
}