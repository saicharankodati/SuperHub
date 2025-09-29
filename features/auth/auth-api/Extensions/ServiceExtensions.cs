namespace auth_api.Extensions;

public static class ServiceExtensions
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("GatewayOnly", policy =>
            {
                var gatewayOrigin = builder.Configuration["Cors:GatewayOrigin"];

                if (string.IsNullOrWhiteSpace(gatewayOrigin))
                    throw new InvalidOperationException("Cors:GatewayOrigin is not configured.");

                policy.WithOrigins(gatewayOrigin)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        return builder;
    }
}
