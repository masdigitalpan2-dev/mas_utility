using MASDigitalService.Models;

namespace MASDigitalService.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (context.SalesRecords.Any())
                return; // DB has been seeded

            var salesRecords = new[]
            {
                new SalesRecord
                {
                    DayDate = DateTime.Parse("2024-01-15"),
                    DigiPay = 1500,
                    DigiWallet = 800,
                    StarEC = 200,
                    SBI = 300,
                    SBI_J = 100,
                    IndBank = 150,
                    INBA = 200,
                    IPPB = 50,
                    IPBC = 75,
                    Sakthi = 120,
                    CUB = 80,
                    TNEGA = 90,
                    Airtel = 60,
                    PayTM = 110,
                    Jio = 70,
                    TataPlay = 85,
                    PendingNote = 25,
                    TotCash = 2500,
                    TotCum = 5300,
                    TotalPending = 500,
                    TodayExp = 200,
                    TotalAll = 5100,
                    Remarks = "Sample data"
                },
                new SalesRecord
                {
                    DayDate = DateTime.Parse("2024-01-14"),
                    DigiPay = 1200,
                    DigiWallet = 600,
                    StarEC = 150,
                    SBI = 250,
                    SBI_J = 80,
                    IndBank = 120,
                    INBA = 160,
                    IPPB = 40,
                    IPBC = 60,
                    Sakthi = 100,
                    CUB = 65,
                    TNEGA = 75,
                    Airtel = 50,
                    PayTM = 90,
                    Jio = 55,
                    TataPlay = 70,
                    PendingNote = 20,
                    TotCash = 2000,
                    TotCum = 4200,
                    TotalPending = 300,
                    TodayExp = 150,
                    TotalAll = 4050,
                    Remarks = "Sample data"
                }
            };

            context.SalesRecords.AddRange(salesRecords);
            context.SaveChanges();
        }
    }
}