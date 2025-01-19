using Db.Dbo.Images;
using Domain.Context;
using Domain.Services.Base;
using Microsoft.EntityFrameworkCore;
using Models.Images;
using DbContext = Db.DbContext;

namespace Domain.Services.Images;

public class ImagesService : EntityServiceBase<Image, ImageDbo>
{
    public ImagesService(IDataContext context, Func<DbContext, DbSet<ImageDbo>> getMainDbSet)
        : base(context, getMainDbSet)
    {
    }

    protected override Task FillDboAsync(ImageDbo dbo, Image entity)
    {
        dbo.Id = entity.Id;
        dbo.Data = entity.Data;
        dbo.Name = entity.Name;
        dbo.CreatedAt = dbo.CreatedAt;
        return Task.CompletedTask;
    }

    protected override Task FillEntityAsync(Image entity, ImageDbo dbo)
    {
        entity.Id = dbo.Id;
        entity.Data = dbo.Data;
        entity.Name = dbo.Name;
        entity.CreatedAt = dbo.CreatedAt;
        return Task.CompletedTask;
    }
}