using MASDigitalService.Services;
using MASDigitalService.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "MAS Digital Service API",
        Version = "v1",
        Description = "API for managing daily sales records in MAS Digital Payment Services",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "MAS Digital Service",
            Email = "support@masdigital.com"
        }
    });
    
    c.EnableAnnotations();
    c.DescribeAllParametersInCamelCase();
    
    // Add example values
    c.SchemaFilter<SwaggerSchemaExampleFilter>();
});

// Add Access Database Services
builder.Services.AddSingleton<AccessDbService>();
builder.Services.AddSingleton<AccessDatabaseService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Initialize Access database
using (var scope = app.Services.CreateScope())
{
    var accessDb = scope.ServiceProvider.GetRequiredService<AccessDbService>();
    // Database initialization happens in constructor
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MAS Digital Service API v1");
        c.RoutePrefix = "swagger";
        c.DocumentTitle = "MAS Digital Service API Documentation";
        c.DefaultModelsExpandDepth(2);
        c.DefaultModelRendering(Swashbuckle.AspNetCore.SwaggerUI.ModelRendering.Example);
        c.DisplayRequestDuration();
        c.EnableDeepLinking();
        c.EnableFilter();
        c.ShowExtensions();
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();