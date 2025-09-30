namespace MASDigitalService.Models
{
    public class SmartCard
    {
        public int Id { get; set; }
        public string FamilyHead { get; set; } = string.Empty;
        public string HusbandName { get; set; } = string.Empty;
        public string DoorNo { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public string CardNumber { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}