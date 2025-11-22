using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Models
{
    [SwaggerSchema(Description = "Represents a pending payment record")]
    public class PaymentRecord
    {
        [SwaggerSchema(Description = "Unique identifier", ReadOnly = true)]
        public int Id { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Payment date")]
        public DateTime Date { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Customer name")]
        [MaxLength(200)]
        public string CustomerName { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Payment amount")]
        public decimal Amount { get; set; }
        
        [SwaggerSchema(Description = "Payment method")]
        [MaxLength(100)]
        public string? PaymentMethod { get; set; }
        
        [SwaggerSchema(Description = "Payment status")]
        [MaxLength(50)]
        public string Status { get; set; } = "Pending";
        
        [SwaggerSchema(Description = "Description")]
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [SwaggerSchema(Description = "Due date")]
        public DateTime? DueDate { get; set; }
        
        [SwaggerSchema(Description = "Created timestamp", ReadOnly = true)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [SwaggerSchema(Description = "Updated timestamp", ReadOnly = true)]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}