namespace Models.Images;

public class Image : EntityInfo, IEntity
{
    public string Name { get; set; }
    public byte[] Data { get; set; }
    public DateTime CreatedAt { get; set; }
}