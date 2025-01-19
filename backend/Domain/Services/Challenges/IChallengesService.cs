using Domain.Services.Base;
using Models.Challenges;

namespace Domain.Services.Challenges;

public interface IChallengesService : IFindEntityService<Challenge, ChallengeSearchRequest>
{
    
}