using Domain.Services.Base;
using Models.Categories;

namespace Domain.Services.Categories;

public interface ICategoriesService : IFindEntityService<Category, CategorySearchRequest>
{
    
}