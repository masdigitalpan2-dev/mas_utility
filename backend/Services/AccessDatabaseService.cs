using Microsoft.Data.Sqlite;
using MASDigitalService.Models;

namespace MASDigitalService.Services
{
    public class AccessDatabaseService
    {
        private readonly string _connectionString;

        public AccessDatabaseService()
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
                CREATE TABLE IF NOT EXISTS daysale (
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
                    Remarks TEXT
                )";

            using var command = new SqliteCommand(createTableSql, connection);
            command.ExecuteNonQuery();
        }

        public async Task<List<SalesRecord>> GetDaySaleRecordsAsync()
        {
            var records = new List<SalesRecord>();
            
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM daysale ORDER BY DayDate DESC";
            using var command = new SqliteCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToSalesRecord(reader));
            }

            return records;
        }

        public async Task<SalesRecord?> GetDaySaleByDateAsync(DateTime date)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM daysale WHERE DayDate = @date";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@date", date.Date.ToString("yyyy-MM-dd"));
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToSalesRecord(reader);
            }

            return null;
        }

        public async Task<SalesRecord?> GetDaySaleByIdAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM daysale WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToSalesRecord(reader);
            }

            return null;
        }

        public async Task<SalesRecord> CreateDaySaleAsync(SalesRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"INSERT INTO daysale (DayDate, DigiPay, DigiWallet, StarEC, SBI, SBI_J, IndBank, INBA, IPPB, IPBC, Sakthi, CUB, TNEGA, Airtel, PayTM, Jio, TataPlay, PendingNote, TotCash, TotCum, TotalPending, TodayExp, TotalAll, Remarks) 
                       VALUES (@DayDate, @DigiPay, @DigiWallet, @StarEC, @SBI, @SBI_J, @IndBank, @INBA, @IPPB, @IPBC, @Sakthi, @CUB, @TNEGA, @Airtel, @PayTM, @Jio, @TataPlay, @PendingNote, @TotCash, @TotCum, @TotalPending, @TodayExp, @TotalAll, @Remarks)";
            
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
            command.Parameters.AddWithValue("@Sakthi", record.Sakthi);
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

            await command.ExecuteNonQueryAsync();
            return record;
        }

        public async Task<SalesRecord?> UpdateDaySaleAsync(int id, SalesRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"UPDATE daysale SET DayDate=@DayDate, DigiPay=@DigiPay, DigiWallet=@DigiWallet, StarEC=@StarEC, SBI=@SBI, SBI_J=@SBI_J, IndBank=@IndBank, INBA=@INBA, IPPB=@IPPB, IPBC=@IPBC, Sakthi=@Sakthi, CUB=@CUB, TNEGA=@TNEGA, Airtel=@Airtel, PayTM=@PayTM, Jio=@Jio, TataPlay=@TataPlay, PendingNote=@PendingNote, TotCash=@TotCash, TotCum=@TotCum, TotalPending=@TotalPending, TodayExp=@TodayExp, TotalAll=@TotalAll, Remarks=@Remarks WHERE Id=@Id";
            
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
            command.Parameters.AddWithValue("@Sakthi", record.Sakthi);
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

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0 ? await GetDaySaleByIdAsync(id) : null;
        }

        public async Task<bool> DeleteDaySaleAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM daysale WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private SalesRecord MapToSalesRecord(SqliteDataReader reader)
        {
            return new SalesRecord
            {
                Id = Convert.ToInt32(reader["Id"]),
                DayDate = DateTime.Parse(reader["DayDate"].ToString()),
                DigiPay = Convert.ToInt32(reader["DigiPay"]),
                DigiWallet = Convert.ToInt32(reader["DigiWallet"]),
                StarEC = Convert.ToInt32(reader["StarEC"]),
                SBI = Convert.ToInt32(reader["SBI"]),
                SBI_J = Convert.ToInt32(reader["SBI_J"]),
                IndBank = Convert.ToInt32(reader["IndBank"]),
                INBA = Convert.ToInt32(reader["INBA"]),
                IPPB = Convert.ToInt32(reader["IPPB"]),
                IPBC = Convert.ToInt32(reader["IPBC"]),
                Sakthi = Convert.ToInt32(reader["Sakthi"]),
                CUB = Convert.ToInt32(reader["CUB"]),
                TNEGA = Convert.ToInt32(reader["TNEGA"]),
                Airtel = Convert.ToInt32(reader["Airtel"]),
                PayTM = Convert.ToInt32(reader["PayTM"]),
                Jio = Convert.ToInt32(reader["Jio"]),
                TataPlay = Convert.ToInt32(reader["TataPlay"]),
                PendingNote = Convert.ToInt32(reader["PendingNote"]),
                TotCash = Convert.ToInt32(reader["TotCash"]),
                TotCum = Convert.ToInt32(reader["TotCum"]),
                TotalPending = Convert.ToInt32(reader["TotalPending"]),
                TodayExp = Convert.ToInt32(reader["TodayExp"]),
                TotalAll = Convert.ToInt32(reader["TotalAll"]),
                Remarks = reader["Remarks"]?.ToString()
            };
        }
    }
}