namespace auth_api.Filters;

public class EndpointFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        return HandleResponse(await Process(HandleRequest(context), next));
    }

    private EndpointFilterInvocationContext HandleRequest(EndpointFilterInvocationContext context)
    {
        var user = context.HttpContext.User.Identity?.Name ?? "Anonymous";
        return context;
    }

    private async ValueTask<object?> Process(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        try
        {
            return Results.Ok(await next(context));
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    private object? HandleResponse(object? response)
    {
        return response;
    }
}
