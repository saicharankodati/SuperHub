namespace api_gateway.Extensions;

public static class AppExtensions
{
    public static WebApplication ConfigureMiddleware(this WebApplication app)
    {
        app.UseCors("FrontendOnly");
        app.MapReverseProxy();

        return app;
    }
}
