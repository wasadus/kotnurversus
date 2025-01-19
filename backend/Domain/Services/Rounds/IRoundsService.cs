using Domain.Services.Base;
using Models.Rounds;

namespace Domain.Services.Rounds;

public interface IRoundsService : IFindEntityService<Round, RoundSearchRequest>
{
    Task<Round> AddHistoryItem(Guid roundId, HistoryItem item);
    Task<Round> UpdateCurrentHistory(Round round);
    Task<Round> SetMark(Guid roundId, (Guid teamId, int amout, bool isWinner) mark);
}