var builder = WebApplication.CreateBuilder(args);
builder.ConfigureServices();

var app = builder.Build();
app.ConfigureMiddleware();
app.MapMinimalAPIEndpoints();

app.Run();
