using Domain.Commands.Base;
using Domain.Context;
using Domain.Services.Base;
using Models.Images;

namespace Domain.Commands.Images;

public class GetImageCommand : GetCommandBase<Image>
{
    public GetImageCommand(IDataContextAccessor dataContextAccessor, IEntityService<Image> service)
        : base(dataContextAccessor, service)
    {
    }
}