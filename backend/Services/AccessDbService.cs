using Microsoft.Data.Sqlite;
using MASDigitalService.Models;

namespace MASDigitalService.Services
{
    public class AccessDbService
    {
        private readonly string _connectionString;

        public AccessDbService()
        {
            var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "sales.db");
            _connectionString = $"Data Source={dbPath}";
            InitializeDatabase();
        }

        private void InitializeDatabase()
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var createTableSql = @"
                CREATE TABLE IF NOT EXISTS SalesRecords (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    DayDate TEXT NOT NULL,
                    DigiPay INTEGER DEFAULT 0,
                    DigiWallet INTEGER DEFAULT 0,
                    StarEC INTEGER DEFAULT 0,
                    SBI INTEGER DEFAULT 0,
                    SBI_J INTEGER DEFAULT 0,
                    IndBank INTEGER DEFAULT 0,
                    INBA INTEGER DEFAULT 0,
                    IPPB INTEGER DEFAULT 0,
                    IPBC INTEGER DEFAULT 0,
                    Sakthi INTEGER DEFAULT 0,
                    CUB INTEGER DEFAULT 0,
                    TNEGA INTEGER DEFAULT 0,
                    Airtel INTEGER DEFAULT 0,
                    PayTM INTEGER DEFAULT 0,
                    Jio INTEGER DEFAULT 0,
                    TataPlay INTEGER DEFAULT 0,
                    PendingNote INTEGER DEFAULT 0,
                    TotCash INTEGER DEFAULT 0,
                    TotCum INTEGER DEFAULT 0,
                    TotalPending INTEGER DEFAULT 0,
                    TodayExp INTEGER DEFAULT 0,
                    TotalAll INTEGER DEFAULT 0,
                    Remarks TEXT,
                    CreatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                    UpdatedAt TEXT DEFAULT CURRENT_TIMESTAMP
                )";

            using var command = new SqliteCommand(createTableSql, connection);
            command.ExecuteNonQuery();

            // Check if data exists
            var countSql = "SELECT COUNT(*) FROM SalesRecords";
            using var countCommand = new SqliteCommand(countSql, connection);
            var count = Convert.ToInt32(countCommand.ExecuteScalar());

            if (count == 0)
            {
                SeedInitialData(connection);
            }
        }

        private void SeedInitialData(SqliteConnection connection)
        {
            var insertSql = @"
                INSERT INTO SalesRecords (DayDate, DigiPay, DigiWallet, StarEC, SBI, SBI_J, IndBank, INBA, IPPB, IPBC, Sakthi, CUB, TNEGA, Airtel, PayTM, Jio, TataPlay, PendingNote, TotCash, TotCum, TotalPending, TodayExp, TotalAll, Remarks)
                VALUES (@DayDate, @DigiPay, @DigiWallet, @StarEC, @SBI, @SBI_J, @IndBank, @INBA, @IPPB, @IPBC, @Sakthi, @CUB, @TNEGA, @Airtel, @PayTM, @Jio, @TataPlay, @PendingNote, @TotCash, @TotCum, @TotalPending, @TodayExp, @TotalAll, @Remarks)";

            var sampleData = new[]
            {
                new { DayDate = DateTime.Today.AddDays(-2).ToString("yyyy-MM-dd"), DigiPay = 1500, DigiWallet = 800, StarEC = 600, SBI = 1200, SBI_J = 400, IndBank = 300, INBA = 250, IPPB = 180, IPBC = 220, Canara = 350, CUB = 280, TNEGA = 150, Airtel = 500, PayTM = 750, Jio = 450, TataPlay = 320, PendingNote = 100, TotCash = 2500, TotCum = 7950, TotalPending = 100, TodayExp = 500, TotalAll = 9950, Remarks = "Sample data" },
                new { DayDate = DateTime.Today.AddDays(-1).ToString("yyyy-MM-dd"), DigiPay = 1800, DigiWallet = 950, StarEC = 720, SBI = 1400, SBI_J = 480, IndBank = 360, INBA = 300, IPPB = 200, IPBC = 250, Canara = 400, CUB = 320, TNEGA = 180, Airtel = 600, PayTM = 850, Jio = 520, TataPlay = 380, PendingNote = 150, TotCash = 3000, TotCum = 9690, TotalPending = 150, TodayExp = 600, TotalAll = 12240, Remarks = "Yesterday's record" }
            };

            foreach (var data in sampleData)
            {
                using var command = new SqliteCommand(insertSql, connection);
                command.Parameters.AddWithValue("@DayDate", data.DayDate);
                command.Parameters.AddWithValue("@DigiPay", data.DigiPay);
                command.Parameters.AddWithValue("@DigiWallet", data.DigiWallet);
                command.Parameters.AddWithValue("@StarEC", data.StarEC);
                command.Parameters.AddWithValue("@SBI", data.SBI);
                command.Parameters.AddWithValue("@SBI_J", data.SBI_J);
                command.Parameters.AddWithValue("@IndBank", data.IndBank);
                command.Parameters.AddWithValue("@INBA", data.INBA);
                command.Parameters.AddWithValue("@IPPB", data.IPPB);
                command.Parameters.AddWithValue("@IPBC", data.IPBC);
                command.Parameters.AddWithValue("@Canara", data.Canara);
                command.Parameters.AddWithValue("@CUB", data.CUB);
                command.Parameters.AddWithValue("@TNEGA", data.TNEGA);
                command.Parameters.AddWithValue("@Airtel", data.Airtel);
                command.Parameters.AddWithValue("@PayTM", data.PayTM);
                command.Parameters.AddWithValue("@Jio", data.Jio);
                command.Parameters.AddWithValue("@TataPlay", data.TataPlay);
                command.Parameters.AddWithValue("@PendingNote", data.PendingNote);
                command.Parameters.AddWithValue("@TotCash", data.TotCash);
                command.Parameters.AddWithValue("@TotCum", data.TotCum);
                command.Parameters.AddWithValue("@TotalPending", data.TotalPending);
                command.Parameters.AddWithValue("@TodayExp", data.TodayExp);
                command.Parameters.AddWithValue("@TotalAll", data.TotalAll);
                command.Parameters.AddWithValue("@Remarks", data.Remarks);
                command.ExecuteNonQuery();
            }
        }

        public async Task<List<SalesRecord>> GetAllAsync()
        {
            var records = new List<SalesRecord>();
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM SalesRecords ORDER BY DayDate DESC";
            using var command = new SqliteCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToSalesRecord(reader));
            }

            return records;
        }

        public async Task<SalesRecord?> GetByIdAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM SalesRecords WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToSalesRecord(reader);
            }

            return null;
        }

        public async Task<SalesRecord> CreateAsync(SalesRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"
                INSERT INTO SalesRecords (DayDate, DigiPay, DigiWallet, StarEC, SBI, SBI_J, IndBank, INBA, IPPB, IPBC, Canara, CUB, TNEGA, Airtel, PayTM, Jio, TataPlay, PendingNote, TotCash, TotCum, TotalPending, TodayExp, TotalAll, Remarks)
                VALUES (@DayDate, @DigiPay, @DigiWallet, @StarEC, @SBI, @SBI_J, @IndBank, @INBA, @IPPB, @IPBC, @Canara, @CUB, @TNEGA, @Airtel, @PayTM, @Jio, @TataPlay, @PendingNote, @TotCash, @TotCum, @TotalPending, @TodayExp, @TotalAll, @Remarks);
                SELECT last_insert_rowid();";

            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@DayDate", record.DayDate.ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@DigiPay", record.DigiPay);
            command.Parameters.AddWithValue("@DigiWallet", record.DigiWallet);
            command.Parameters.AddWithValue("@StarEC", record.StarEC);
            command.Parameters.AddWithValue("@SBI", record.SBI);
            command.Parameters.AddWithValue("@SBI_J", record.SBI_J);
            command.Parameters.AddWithValue("@IndBank", record.IndBank);
            command.Parameters.AddWithValue("@INBA", record.INBA);
            command.Parameters.AddWithValue("@IPPB", record.IPPB);
            command.Parameters.AddWithValue("@IPBC", record.IPBC);
            command.Parameters.AddWithValue("@Sakthi", record.Canara);
            command.Parameters.AddWithValue("@CUB", record.CUB);
            command.Parameters.AddWithValue("@TNEGA", record.TNEGA);
            command.Parameters.AddWithValue("@Airtel", record.Airtel);
            command.Parameters.AddWithValue("@PayTM", record.PayTM);
            command.Parameters.AddWithValue("@Jio", record.Jio);
            command.Parameters.AddWithValue("@TataPlay", record.TataPlay);
            command.Parameters.AddWithValue("@PendingNote", record.PendingNote);
            command.Parameters.AddWithValue("@TotCash", record.TotCash);
            command.Parameters.AddWithValue("@TotCum", record.TotCum);
            command.Parameters.AddWithValue("@TotalPending", record.TotalPending);
            command.Parameters.AddWithValue("@TodayExp", record.TodayExp);
            command.Parameters.AddWithValue("@TotalAll", record.TotalAll);
            command.Parameters.AddWithValue("@Remarks", record.Remarks ?? "");

            var newId = Convert.ToInt32(await command.ExecuteScalarAsync());
            return await GetByIdAsync(newId) ?? record;
        }

        public async Task<SalesRecord?> UpdateAsync(int id, SalesRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"
                UPDATE SalesRecords SET 
                    DayDate = @DayDate, DigiPay = @DigiPay, DigiWallet = @DigiWallet, StarEC = @StarEC, SBI = @SBI, SBI_J = @SBI_J, 
                    IndBank = @IndBank, INBA = @INBA, IPPB = @IPPB, IPBC = @IPBC, Sakthi = @Sakthi, CUB = @CUB, TNEGA = @TNEGA, 
                    Airtel = @Airtel, PayTM = @PayTM, Jio = @Jio, TataPlay = @TataPlay, PendingNote = @PendingNote, TotCash = @TotCash, 
                    TotCum = @TotCum, TotalPending = @TotalPending, TodayExp = @TodayExp, TotalAll = @TotalAll, Remarks = @Remarks, 
                    UpdatedAt = CURRENT_TIMESTAMP
                WHERE Id = @Id";

            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@DayDate", record.DayDate.ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@DigiPay", record.DigiPay);
            command.Parameters.AddWithValue("@DigiWallet", record.DigiWallet);
            command.Parameters.AddWithValue("@StarEC", record.StarEC);
            command.Parameters.AddWithValue("@SBI", record.SBI);
            command.Parameters.AddWithValue("@SBI_J", record.SBI_J);
            command.Parameters.AddWithValue("@IndBank", record.IndBank);
            command.Parameters.AddWithValue("@INBA", record.INBA);
            command.Parameters.AddWithValue("@IPPB", record.IPPB);
            command.Parameters.AddWithValue("@IPBC", record.IPBC);
            command.Parameters.AddWithValue("@Sakthi", record.Canara);
            command.Parameters.AddWithValue("@CUB", record.CUB);
            command.Parameters.AddWithValue("@TNEGA", record.TNEGA);
            command.Parameters.AddWithValue("@Airtel", record.Airtel);
            command.Parameters.AddWithValue("@PayTM", record.PayTM);
            command.Parameters.AddWithValue("@Jio", record.Jio);
            command.Parameters.AddWithValue("@TataPlay", record.TataPlay);
            command.Parameters.AddWithValue("@PendingNote", record.PendingNote);
            command.Parameters.AddWithValue("@TotCash", record.TotCash);
            command.Parameters.AddWithValue("@TotCum", record.TotCum);
            command.Parameters.AddWithValue("@TotalPending", record.TotalPending);
            command.Parameters.AddWithValue("@TodayExp", record.TodayExp);
            command.Parameters.AddWithValue("@TotalAll", record.TotalAll);
            command.Parameters.AddWithValue("@Remarks", record.Remarks ?? "");
            command.Parameters.AddWithValue("@Id", id);

            await command.ExecuteNonQueryAsync();
            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM SalesRecords WHERE Id = @Id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private SalesRecord MapToSalesRecord(SqliteDataReader reader)
        {
            return new SalesRecord
            {
                //Id = reader.GetInt32("Id"),
                //DayDate = DateTime.Parse(reader.GetString("DayDate")),
                //DigiPay = reader.GetInt32("DigiPay"),
                //DigiWallet = reader.GetInt32("DigiWallet"),
                //StarEC = reader.GetInt32("StarEC"),
                //SBI = reader.GetInt32("SBI"),
                //SBI_J = reader.GetInt32("SBI_J"),
                //IndBank = reader.GetInt32("IndBank"),
                //INBA = reader.GetInt32("INBA"),
                //IPPB = reader.GetInt32("IPPB"),
                //IPBC = reader.GetInt32("IPBC"),
                //Sakthi = reader.GetInt32("Sakthi"),
                //CUB = reader.GetInt32("CUB"),
                //TNEGA = reader.GetInt32("TNEGA"),
                //Airtel = reader.GetInt32("Airtel"),
                //PayTM = reader.GetInt32("PayTM"),
                //Jio = reader.GetInt32("Jio"),
                //TataPlay = reader.GetInt32("TataPlay"),
                //PendingNote = reader.GetInt32("PendingNote"),
                //TotCash = reader.GetInt32("TotCash"),
                //TotCum = reader.GetInt32("TotCum"),
                //TotalPending = reader.GetInt32("TotalPending"),
                //TodayExp = reader.GetInt32("TodayExp"),
                //TotalAll = reader.GetInt32("TotalAll"),
                //Remarks = reader.IsDBNull("Remarks") ? null : reader.GetString("Remarks"),
                //CreatedAt = DateTime.Parse(reader.GetString("CreatedAt")),
                //UpdatedAt = DateTime.Parse(reader.GetString("UpdatedAt"))
            };
        }
    }
}