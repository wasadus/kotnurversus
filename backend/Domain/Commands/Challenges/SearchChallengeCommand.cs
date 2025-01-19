using Domain.Commands.Base;
using Domain.Context;
using Domain.Services.Base;
using Models.Challenges;

namespace Domain.Commands.Challenges;

public class SearchChallengeCommand : SearchCommandBase<Challenge, ChallengeSearchRequest>
{
    public SearchChallengeCommand(IFindEntityService<Challenge, ChallengeSearchRequest> service, IDataContextAccessor dataContextAccessor)
        : base(service, dataContextAccessor)
    {
    }
}