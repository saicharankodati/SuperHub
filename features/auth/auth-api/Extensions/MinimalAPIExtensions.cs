namespace auth_api.Extensions;

public static class MinimalAPIExtensions
{
    public static WebApplication MapMinimalAPIEndpoints(this WebApplication app)
    {
        app.MapGet("/", () => Results.Text("Auth API"));
        app.MapWeatherforecastEndpoints();

        return app;
    }
}
