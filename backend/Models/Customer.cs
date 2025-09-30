namespace MASDigitalService.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ServiceType { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }

    public class DaySale
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string ServiceType { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string PaymentMode { get; set; } = string.Empty;
    }

    public class MonthlyExpense
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string ExpenseType { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}