using Db.Dbo.Images;
using Domain.Context;
using Domain.Services.Rounds;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Models;
using Models.Rounds;
using Newtonsoft.Json.Serialization;
using Vostok.Commons.Time.TimeProviders;

namespace Domain.Commands.Rounds;

public class AddArtifactCommand : IAddArtifactCommand
{
    private readonly IRoundsService roundsService;
    private readonly IDateTimeProvider dateTimeProvider;
    private readonly IDataContextAccessor dataContextAccessor;

    public AddArtifactCommand(
        IDataContextAccessor dataContextAccessor,
        IRoundsService roundsService,
        IDateTimeProvider dateTimeProvider)
    {
        this.dataContextAccessor = dataContextAccessor;
        this.roundsService = roundsService;
        this.dateTimeProvider = dateTimeProvider;
    }

    public async Task<DomainResult<Artifact, AccessSingleEntityError>> RunAsync(
        Guid roundId,
        ArtifactType artifactType,
        MemoryStream? fileStream,
        string? fileName,
        string? description)
    {
        var res = await dataContextAccessor.AccessDataAsync<DomainResult<Artifact, AccessSingleEntityError>>(
            async context =>
            {
                var round = await roundsService.FindAsync(roundId);
                if (round == null)
                    return new ErrorInfo<AccessSingleEntityError>(AccessSingleEntityError.NotFound, "Round not found");

                if (artifactType == ArtifactType.Text && description == null)
                    return new ErrorInfo<AccessSingleEntityError>(AccessSingleEntityError.InvalidData, "Description is required, when artifact type is text");

                if (artifactType == ArtifactType.Image && fileStream == null)
                    return new ErrorInfo<AccessSingleEntityError>(AccessSingleEntityError.InvalidData, "File is required, when artifact type is image");

                var artifact = new Artifact
                {
                    Id = Guid.NewGuid(),
                    Type = artifactType,
                    Title = description ?? fileName
                };

                switch (artifactType)
                {
                    case ArtifactType.Text:
                        artifact.Content = description!;
                        break;
                    case ArtifactType.Image:
                        var imageDbo = new ImageDbo
                        {
                            CreatedAt = dateTimeProvider.Now,
                            Data = fileStream!.ToArray(),
                            Name = fileName
                        };
                        await context.Images.AddAsync(imageDbo);
                        await context.SaveChangesAsync();
                        
                        artifact.Content = imageDbo.Id.ToString();
                        break;
                    default:
                        throw new ArgumentOutOfRangeException(nameof(artifactType), artifactType, null);
                }

                await roundsService.PatchAsync(
                    round,
                    new JsonPatchDocument<Round>(
                        new List<Operation<Round>>()
                        {
                            new()
                            {
                                path = "artifacts/-",
                                op = "add",
                                value = artifact
                            }
                        },
                        new DefaultContractResolver()));

                await context.SaveChangesAsync();

                return artifact;
            });

        return res;
    }
}