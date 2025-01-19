using Domain.Commands;
using KotnurVersus.Web.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Models.Images;
using static KotnurVersus.Web.Helpers.ImagesHelper;

namespace KotnurVersus.Web.Controllers;

public class ImagesController : ApiControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetImage([FromServices] IGetCommand<Image> command, Guid id)
    {
        var result = await command.RunAsync(id);
        return File(result.Result.Data, GetImageMimeType(result.Result.Name));
    }
}