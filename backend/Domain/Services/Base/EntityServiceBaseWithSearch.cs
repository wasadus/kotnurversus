using Core.Helpers;
using Db.Dbo;
using Domain.Context;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.Search;
using DbContext = Db.DbContext;

namespace Domain.Services.Base;

public abstract class EntityServiceWithSearchRequest<T, TDbo, TSearchRequest> : EntityServiceBase<T, TDbo>
    where T : EntityInfo, IEntity, new()
    where TDbo : Dbo, new()
    where TSearchRequest : SearchRequestBase, ISearchRequest
{
    protected EntityServiceWithSearchRequest(IDataContext context, Func<DbContext, DbSet<TDbo>> getMainDbSet)
        : base(context, getMainDbSet)
    {
    }

    public async Task<SearchResult<T>> SearchAsync(TSearchRequest searchRequest, CancellationToken cancellationToken)
    {
        var queryable = ReadDbosAsync();
        queryable = await ApplyFilterAsync(queryable, searchRequest);

        var dbos = await queryable
            .AsEnumerable()
            .Select(async x => await ToApiAsync(x))
            .ToArrayAsync();

        var result = new SearchResult<T>(dbos);

        return result;
    }

    protected virtual Task<IQueryable<TDbo>> ApplyFilterAsync(IQueryable<TDbo> queryable, TSearchRequest searchRequest)
    {
        if (searchRequest.Limit != null)
            queryable = queryable.Take(searchRequest.Limit.Value);

        return Task.FromResult(queryable);
    }
}