using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel;

namespace MASDigitalService.Models
{
    [SwaggerSchema(Description = "Represents a daily expense record")]
    public class ExpenseRecord
    {
        [SwaggerSchema(Description = "Unique identifier for the expense record", ReadOnly = true)]
        public int Id { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Date of the expense (YYYY-MM-DD format)")]
        [DisplayName("Expense Date")]
        public DateTime Date { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Expense category")]
        [DisplayName("Category")]
        [MaxLength(100)]
        public string Category { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Expense amount")]
        [DisplayName("Amount")]
        public decimal Amount { get; set; }
        
        [SwaggerSchema(Description = "Expense description")]
        [DisplayName("Description")]
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [SwaggerSchema(Description = "Record creation timestamp", ReadOnly = true)]
        [DisplayName("Created At")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [SwaggerSchema(Description = "Record last update timestamp", ReadOnly = true)]
        [DisplayName("Updated At")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}