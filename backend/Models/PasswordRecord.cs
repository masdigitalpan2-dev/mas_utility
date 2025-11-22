using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Models
{
    [SwaggerSchema(Description = "Represents a password record")]
    public class PasswordRecord
    {
        [SwaggerSchema(Description = "Unique identifier", ReadOnly = true)]
        public int Id { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Service name")]
        [MaxLength(200)]
        public string ServiceName { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Username")]
        [MaxLength(200)]
        public string Username { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Password")]
        [MaxLength(500)]
        public string Password { get; set; }
        
        [SwaggerSchema(Description = "Website URL")]
        [MaxLength(500)]
        public string? Website { get; set; }
        
        [SwaggerSchema(Description = "Category")]
        [MaxLength(100)]
        public string? Category { get; set; }
        
        [SwaggerSchema(Description = "Notes")]
        [MaxLength(1000)]
        public string? Notes { get; set; }
        
        [SwaggerSchema(Description = "Created timestamp", ReadOnly = true)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [SwaggerSchema(Description = "Updated timestamp", ReadOnly = true)]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}