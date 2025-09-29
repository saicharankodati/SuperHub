namespace auth_api.Extensions;

public static class MinimalAPIExtensions
{
    public static WebApplication MapMinimalAPIEndpoints(this WebApplication app)
    {
        var routeGroup = app.MapGroup("/");
        routeGroup.AddEndpointFilter<EndpointFilter>();

        routeGroup.MapGet("/", () => Results.Text("Auth API"));
        routeGroup.MapWeatherforecastEndpoints();

        return app;
    }
}
