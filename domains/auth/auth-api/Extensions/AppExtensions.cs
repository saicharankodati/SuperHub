namespace auth_api.Extensions;

public static class AppExtensions
{
    public static WebApplication ConfigureMiddleware(this WebApplication app)
    {
        app.UseHttpsRedirection();

        return app;
    }
}
