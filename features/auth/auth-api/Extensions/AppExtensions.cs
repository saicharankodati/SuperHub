namespace auth_api.Extensions;

public static class AppExtensions
{
    public static WebApplication ConfigureMiddleware(this WebApplication app)
    {
        app.UseCors("GatewayOnly");
        app.UseHttpsRedirection();

        return app;
    }
}
