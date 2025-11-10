using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel;

namespace MASDigitalService.Models
{
    [SwaggerSchema(Description = "Represents a daily sales record with all payment method details")]
    public class SalesRecord
    {
        [SwaggerSchema(Description = "Unique identifier for the sales record", ReadOnly = true)]
        public int Id { get; set; }
        
        [Required]
        [SwaggerSchema(Description = "Date of the sales record (YYYY-MM-DD format)")]
        [DisplayName("Sales Date")]
        public DateTime DayDate { get; set; }
        
        [SwaggerSchema(Description = "DigiPay payment amount")]
        [DisplayName("DigiPay")]
        public int DigiPay { get; set; }
        
        [SwaggerSchema(Description = "DigiWallet payment amount")]
        [DisplayName("DigiWallet")]
        public int DigiWallet { get; set; }
        
        [SwaggerSchema(Description = "StarEC payment amount")]
        [DisplayName("StarEC")]
        public int StarEC { get; set; }
        
        [SwaggerSchema(Description = "SBI payment amount")]
        [DisplayName("SBI")]
        public int SBI { get; set; }
        
        [SwaggerSchema(Description = "SBI (J) payment amount")]
        [DisplayName("SBI (J)")]
        public int SBI_J { get; set; }
        
        [SwaggerSchema(Description = "IndBank payment amount")]
        [DisplayName("IndBank")]
        public int IndBank { get; set; }
        
        [SwaggerSchema(Description = "INBA payment amount")]
        [DisplayName("INBA")]
        public int INBA { get; set; }
        
        [SwaggerSchema(Description = "IPPB payment amount")]
        [DisplayName("IPPB")]
        public int IPPB { get; set; }
        
        [SwaggerSchema(Description = "IPBC payment amount")]
        [DisplayName("IPBC")]
        public int IPBC { get; set; }
        
        [SwaggerSchema(Description = "Canara payment amount")]
        [DisplayName("Canara")]
        public int Canara { get; set; }
        
        [SwaggerSchema(Description = "CUB/City Union Bank payment amount")]
        [DisplayName("CUB")]
        public int CUB { get; set; }
        
        [SwaggerSchema(Description = "TNEGA/E-Sevai payment amount")]
        [DisplayName("TNEGA")]
        public int TNEGA { get; set; }
        
        [SwaggerSchema(Description = "Airtel payment amount")]
        [DisplayName("Airtel")]
        public int Airtel { get; set; }
        
        [SwaggerSchema(Description = "PayTM payment amount")]
        [DisplayName("PayTM")]
        public int PayTM { get; set; }
        
        [SwaggerSchema(Description = "Jio payment amount")]
        [DisplayName("Jio")]
        public int Jio { get; set; }
        
        [SwaggerSchema(Description = "TataPlay payment amount")]
        [DisplayName("TataPlay")]
        public int TataPlay { get; set; }
        
        [SwaggerSchema(Description = "Pending notes amount")]
        [DisplayName("Pending Note")]
        public int PendingNote { get; set; }

        [SwaggerSchema(Description = "Cash Denomination 500 amount")]
        [DisplayName("₹500")]
        public int r500 { get; set; }

        [SwaggerSchema(Description = "Cash Denomination 200 amount")]
        [DisplayName("₹200")]
        public int r200 { get; set; }

        [SwaggerSchema(Description = "Cash Denomination 100 amount")]
        [DisplayName("Cash Denomination 100")]
        public int r100 { get; set; }

        [SwaggerSchema(Description = "Cash Denomination 50 amount")]
        [DisplayName("Cash Denomination 50")]
        public int r50 { get; set; }

        [SwaggerSchema(Description = "Cash Denomination 20 amount")]
        [DisplayName("Cash Denomination 20")]
        public int r20 { get; set; }

        [SwaggerSchema(Description = "Cash Denomination 10 amount")]
        [DisplayName("Cash Denomination 10")]
        public int r10 { get; set; }

        [SwaggerSchema(Description = "Cash Denomination Change amount")]
        [DisplayName("Cash Denomination Change")]
        public int rChange { get; set; }

        [SwaggerSchema(Description = "Total cash amount")]
        [DisplayName("Total Cash")]
        public int TotCash { get; set; }
        
        [SwaggerSchema(Description = "Total cumulative digital payments (auto-calculated)", ReadOnly = true)]
        [DisplayName("Total Digital")]
        public int TotCum { get; set; }
        
        [SwaggerSchema(Description = "Total pending amount")]
        [DisplayName("Total Pending")]
        public int TotalPending { get; set; }
        
        [SwaggerSchema(Description = "Today's expenses")]
        [DisplayName("Today Expense")]
        public int TodayExp { get; set; }
        
        [SwaggerSchema(Description = "Grand total amount (auto-calculated)", ReadOnly = true)]
        [DisplayName("Total All")]
        public int TotalAll { get; set; }
        
        [SwaggerSchema(Description = "Additional remarks or notes")]
        [DisplayName("Remarks")]
        [MaxLength(500)]
        public string? Remarks { get; set; }
        
        [SwaggerSchema(Description = "Record creation timestamp", ReadOnly = true)]
        [DisplayName("Created At")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [SwaggerSchema(Description = "Record last update timestamp", ReadOnly = true)]
        [DisplayName("Updated At")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}