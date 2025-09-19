namespace api_gateway.Extensions;

public static class MinimalAPIExtensions
{
    public static WebApplication MapMinimalAPIEndpoints(this WebApplication app)
    {
        app.MapGet("/", () => Results.Text("API Gateway"));

        return app;
    }
}
