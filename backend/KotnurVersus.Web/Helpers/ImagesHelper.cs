namespace KotnurVersus.Web.Helpers;

public static class ImagesHelper
{
    private static IReadOnlyDictionary<string, string> formatToMimeType = new Dictionary<string, string>()
    {
        {"png", "image/png"},
        {"jpeg", "image/jpeg"},
        {"jpg", "image"},
    };

    public static string GetImageMimeType(string fileName)
    {
        var fileFormat = fileName.Split(".")[^1];
        if (!formatToMimeType.TryGetValue(fileFormat, out var mimeType))
        {
            throw new KeyNotFoundException($"Не можем транслировать файл с данным форматом: {fileFormat}");
        }

        return mimeType;
    }

}