using System.ComponentModel.DataAnnotations.Schema;

namespace Db.Dbo.Images;

[Table("images")]
public class ImageDbo : Dbo
{
    public string Name { get; set; }
    public byte[] Data { get; set; }
    public DateTime CreatedAt { get; set; }
}