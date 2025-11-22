using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Models
{
    [SwaggerSchema(Description = "Represents a customer record")]
    public class CustomerRecord
    {
        [SwaggerSchema(Description = "Unique identifier", ReadOnly = true)]
        public int CustomerId { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Customer name")]
        [MaxLength(200)]
        public string Name { get; set; }
        
        [SwaggerSchema(Description = "Phone number")]
        public long? Phone { get; set; }
        
        [SwaggerSchema(Description = "Email address")]
        [MaxLength(200)]
        public string? Email { get; set; }
        
        [SwaggerSchema(Description = "Address")]
        [MaxLength(500)]
        public string? Address { get; set; }
        
        [SwaggerSchema(Description = "Father/Husband name")]
        [MaxLength(200)]
        public string? FatherHusbandName { get; set; }
        
        [SwaggerSchema(Description = "Place/Location")]
        [MaxLength(200)]
        public string? Place { get; set; }
        
        [SwaggerSchema(Description = "EB Number")]
        public long? EbNumber { get; set; }
        
        [SwaggerSchema(Description = "DTH Number")]
        public long? DthNumber { get; set; }
        
        [SwaggerSchema(Description = "DTH Provider")]
        [MaxLength(100)]
        public string? DthProvider { get; set; }
        
        [SwaggerSchema(Description = "Aadhar Number")]
        public long? Aadhar { get; set; }
        
        [SwaggerSchema(Description = "Customer type")]
        [MaxLength(50)]
        public string? CustomerType { get; set; }
        
        [SwaggerSchema(Description = "Notes/Remarks")]
        [MaxLength(1000)]
        public string? Notes { get; set; }
        
        [SwaggerSchema(Description = "Customer photo (base64 encoded)")]
        public string? Photo { get; set; }
        
        [SwaggerSchema(Description = "Created by user")]
        [MaxLength(100)]
        public string? CreatedBy { get; set; }
        
        [SwaggerSchema(Description = "Created timestamp", ReadOnly = true)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [SwaggerSchema(Description = "Updated timestamp", ReadOnly = true)]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}