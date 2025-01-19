using Domain.Services.Base;
using Models.Games;

namespace Domain.Services.Games;

public interface IGamesService : IFindEntityService<Game, GameSearchRequest>
{
    Task DeleteAllRounds(Guid gameId);
}