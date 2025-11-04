using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using MASDigitalService.Models;

namespace MASDigitalService.Swagger
{
    public class SwaggerSchemaExampleFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (context.Type == typeof(SalesRecord))
            {
                schema.Example = new Microsoft.OpenApi.Any.OpenApiObject
                {
                    ["dayDate"] = new Microsoft.OpenApi.Any.OpenApiString("2024-01-15"),
                    ["digiPay"] = new Microsoft.OpenApi.Any.OpenApiInteger(1500),
                    ["digiWallet"] = new Microsoft.OpenApi.Any.OpenApiInteger(800),
                    ["starEC"] = new Microsoft.OpenApi.Any.OpenApiInteger(200),
                    ["sbi"] = new Microsoft.OpenApi.Any.OpenApiInteger(300),
                    ["sbi_J"] = new Microsoft.OpenApi.Any.OpenApiInteger(100),
                    ["indBank"] = new Microsoft.OpenApi.Any.OpenApiInteger(150),
                    ["inba"] = new Microsoft.OpenApi.Any.OpenApiInteger(200),
                    ["ippb"] = new Microsoft.OpenApi.Any.OpenApiInteger(50),
                    ["ipbc"] = new Microsoft.OpenApi.Any.OpenApiInteger(75),
                    ["sakthi"] = new Microsoft.OpenApi.Any.OpenApiInteger(120),
                    ["cub"] = new Microsoft.OpenApi.Any.OpenApiInteger(80),
                    ["tnega"] = new Microsoft.OpenApi.Any.OpenApiInteger(90),
                    ["airtel"] = new Microsoft.OpenApi.Any.OpenApiInteger(60),
                    ["payTM"] = new Microsoft.OpenApi.Any.OpenApiInteger(110),
                    ["jio"] = new Microsoft.OpenApi.Any.OpenApiInteger(70),
                    ["tataPlay"] = new Microsoft.OpenApi.Any.OpenApiInteger(85),
                    ["pendingNote"] = new Microsoft.OpenApi.Any.OpenApiInteger(25),
                    ["totCash"] = new Microsoft.OpenApi.Any.OpenApiInteger(2500),
                    ["totalPending"] = new Microsoft.OpenApi.Any.OpenApiInteger(500),
                    ["todayExp"] = new Microsoft.OpenApi.Any.OpenApiInteger(200),
                    ["remarks"] = new Microsoft.OpenApi.Any.OpenApiString("Daily sales entry")
                };
            }
        }
    }
}