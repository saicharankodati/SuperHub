namespace api_gateway.Extensions;

public static class ServiceExtensions
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("FrontendOnly", policy =>
            {
                var frontendOrigin = builder.Configuration["Cors:FrontendOrigin"];

                if (string.IsNullOrWhiteSpace(frontendOrigin))
                    throw new InvalidOperationException("Cors:FrontendOrigin is not configured.");

                policy.WithOrigins(frontendOrigin)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });
        builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

        return builder;
    }
}
