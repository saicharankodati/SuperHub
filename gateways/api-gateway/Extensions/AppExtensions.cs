namespace api_gateway.Extensions;

public static class AppExtensions
{
    public static WebApplication ConfigureMiddleware(this WebApplication app)
    {
        app.MapReverseProxy();

        return app;
    }
}
