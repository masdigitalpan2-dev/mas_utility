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
                    Canara INTEGER DEFAULT 0,
                    CUB INTEGER DEFAULT 0,
                    TNEGA INTEGER DEFAULT 0,
                    Airtel INTEGER DEFAULT 0,
                    PayTM INTEGER DEFAULT 0,
                    Jio INTEGER DEFAULT 0,
                    TataPlay INTEGER DEFAULT 0,
                    PendingNote INTEGER DEFAULT 0,
                    r500 INTEGER DEFAULT 0,
                    r200 INTEGER DEFAULT 0,
                    r100 INTEGER DEFAULT 0,
                    r50 INTEGER DEFAULT 0,
                    r20 INTEGER DEFAULT 0,
                    r10 INTEGER DEFAULT 0,
                    rChange INTEGER DEFAULT 0,
                    TotCash INTEGER DEFAULT 0,
                    TotCum INTEGER DEFAULT 0,
                    TotalPending INTEGER DEFAULT 0,
                    TodayExp INTEGER DEFAULT 0,
                    TotalAll INTEGER DEFAULT 0,
                    Remarks TEXT,
                    created_at datetime,
                    updated_at datetime
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

            var sql = @"INSERT INTO daysale (DayDate, DigiPay, DigiWallet, StarEC, SBI, SBI_J, IndBank, INBA, IPPB, IPBC, Canara, CUB, TNEGA, Airtel, PayTM, Jio, TataPlay, PendingNote, r500, r200, r100, r50, r20, r10, rChange, TotCash, TotCum, TotalPending, TodayExp, TotalAll, Remarks, created_at, updated_at) 
                       VALUES (@DayDate, @DigiPay, @DigiWallet, @StarEC, @SBI, @SBI_J, @IndBank, @INBA, @IPPB, @IPBC, @Canara, @CUB, @TNEGA, @Airtel, @PayTM, @Jio, @TataPlay, @PendingNote, @r500, @r200, @r100, @r50, @r20, @r10, @rChange, @TotCash, @TotCum, @TotalPending, @TodayExp, @TotalAll, @Remarks, @created_at, @updated_at)";
            
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
            command.Parameters.AddWithValue("@Canara", record.Canara);
            command.Parameters.AddWithValue("@CUB", record.CUB);
            command.Parameters.AddWithValue("@TNEGA", record.TNEGA);
            command.Parameters.AddWithValue("@Airtel", record.Airtel);
            command.Parameters.AddWithValue("@PayTM", record.PayTM);
            command.Parameters.AddWithValue("@Jio", record.Jio);
            command.Parameters.AddWithValue("@TataPlay", record.TataPlay);
            command.Parameters.AddWithValue("@PendingNote", record.PendingNote);
            command.Parameters.AddWithValue("@r500", record.r500);
            command.Parameters.AddWithValue("@r200", record.r200);
            command.Parameters.AddWithValue("@r100", record.r100);
            command.Parameters.AddWithValue("@r50", record.r50);
            command.Parameters.AddWithValue("@r20", record.r20);
            command.Parameters.AddWithValue("@r10", record.r10);
            command.Parameters.AddWithValue("@rChange", record.rChange);
            command.Parameters.AddWithValue("@TotCash", record.TotCash);
            command.Parameters.AddWithValue("@TotCum", record.TotCum);
            command.Parameters.AddWithValue("@TotalPending", record.TotalPending);
            command.Parameters.AddWithValue("@TodayExp", record.TodayExp);
            command.Parameters.AddWithValue("@TotalAll", record.TotalAll);
            command.Parameters.AddWithValue("@Remarks", record.Remarks ?? "");
            command.Parameters.AddWithValue("@created_at", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            command.Parameters.AddWithValue("@updated_at", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            await command.ExecuteNonQueryAsync();
            return record;
        }

        public async Task<SalesRecord?> UpdateDaySaleAsync(int id, SalesRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"UPDATE daysale SET DayDate=@DayDate, DigiPay=@DigiPay, DigiWallet=@DigiWallet, StarEC=@StarEC, SBI=@SBI, SBI_J=@SBI_J, IndBank=@IndBank, INBA=@INBA, IPPB=@IPPB, IPBC=@IPBC, Canara=@Canara, CUB=@CUB, TNEGA=@TNEGA, Airtel=@Airtel, PayTM=@PayTM, Jio=@Jio, TataPlay=@TataPlay, PendingNote=@PendingNote, r500=@r500, r200=@r200, r100=@r100, r50=@r50, r20=@r20, r10=@r10, rChange=@rChange, TotCash=@TotCash, TotCum=@TotCum, TotalPending=@TotalPending, TodayExp=@TodayExp, TotalAll=@TotalAll, Remarks=@Remarks, updated_at=@updated_at WHERE Id=@Id";
            
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
            command.Parameters.AddWithValue("@Canara", record.Canara);
            command.Parameters.AddWithValue("@CUB", record.CUB);
            command.Parameters.AddWithValue("@TNEGA", record.TNEGA);
            command.Parameters.AddWithValue("@Airtel", record.Airtel);
            command.Parameters.AddWithValue("@PayTM", record.PayTM);
            command.Parameters.AddWithValue("@Jio", record.Jio);
            command.Parameters.AddWithValue("@TataPlay", record.TataPlay);
            command.Parameters.AddWithValue("@PendingNote", record.PendingNote);
            command.Parameters.AddWithValue("@r500", record.r500);
            command.Parameters.AddWithValue("@r200", record.r200);
            command.Parameters.AddWithValue("@r100", record.r100);
            command.Parameters.AddWithValue("@r50", record.r50);
            command.Parameters.AddWithValue("@r20", record.r20);
            command.Parameters.AddWithValue("@r10", record.r10);
            command.Parameters.AddWithValue("@rChange", record.rChange);
            command.Parameters.AddWithValue("@TotCash", record.TotCash);
            command.Parameters.AddWithValue("@TotCum", record.TotCum);
            command.Parameters.AddWithValue("@TotalPending", record.TotalPending);
            command.Parameters.AddWithValue("@TodayExp", record.TodayExp);
            command.Parameters.AddWithValue("@TotalAll", record.TotalAll);
            command.Parameters.AddWithValue("@Remarks", record.Remarks ?? "");
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@updated_at", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

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
                Canara = Convert.ToInt32(reader["Canara"]),
                CUB = Convert.ToInt32(reader["CUB"]),
                TNEGA = Convert.ToInt32(reader["TNEGA"]),
                Airtel = Convert.ToInt32(reader["Airtel"]),
                PayTM = Convert.ToInt32(reader["PayTM"]),
                Jio = Convert.ToInt32(reader["Jio"]),
                TataPlay = Convert.ToInt32(reader["TataPlay"]),
                PendingNote = Convert.ToInt32(reader["PendingNote"]),
                r500 = Convert.ToInt32(reader["r500"]),
                r200 = Convert.ToInt32(reader["r200"]),
                r100 = Convert.ToInt32(reader["r100"]),
                r50 = Convert.ToInt32(reader["r50"]),
                r20 = Convert.ToInt32(reader["r20"]),
                r10 = Convert.ToInt32(reader["r10"]),
                rChange = Convert.ToInt32(reader["rChange"]),
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