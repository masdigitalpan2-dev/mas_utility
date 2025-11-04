using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.IO;
using System.Threading.Tasks;

namespace MASDigitalService.Frontend
{
    public class SalesRecord
    {
        public int Id { get; set; }
        public DateTime DayDate { get; set; }
        public int DigiPay { get; set; }
        public int DigiWallet { get; set; }
        public int StarEC { get; set; }
        public int SBI { get; set; }
        public int SBI_J { get; set; }
        public int IndBank { get; set; }
        public int INBA { get; set; }
        public int IPPB { get; set; }
        public int IPBC { get; set; }
        public int Sakthi { get; set; }
        public int CUB { get; set; }
        public int TNEGA { get; set; }
        public int Airtel { get; set; }
        public int PayTM { get; set; }
        public int Jio { get; set; }
        public int TataPlay { get; set; }
        public int PendingNote { get; set; }
        public int TotCash { get; set; }
        public int TotCum { get; set; }
        public int TotalPending { get; set; }
        public int TodayExp { get; set; }
        public int TotalAll { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class AccessDbHelper
    {
        private readonly string _connectionString;

        public AccessDbHelper(string dbPath = "MASDigitalService.accdb")
        {
            var fullPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, dbPath);
            _connectionString = $"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={fullPath};";
        }

        public async Task<List<SalesRecord>> GetAllRecordsAsync()
        {
            var records = new List<SalesRecord>();
            
            using var connection = new OleDbConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM SalesRecords ORDER BY DayDate DESC";
            using var command = new OleDbCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToSalesRecord(reader));
            }

            return records;
        }

        public async Task<SalesRecord> GetRecordByIdAsync(int id)
        {
            using var connection = new OleDbConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM SalesRecords WHERE Id = ?";
            using var command = new OleDbCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            
            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return MapToSalesRecord(reader);
            }

            return null;
        }

        public async Task<int> CreateRecordAsync(SalesRecord record)
        {
            using var connection = new OleDbConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"
                INSERT INTO SalesRecords 
                (DayDate, DigiPay, DigiWallet, StarEC, SBI, SBI_J, IndBank, INBA, IPPB, IPBC, 
                 Sakthi, CUB, TNEGA, Airtel, PayTM, Jio, TataPlay, PendingNote, TotCash, TotCum, 
                 TotalPending, TodayExp, TotalAll, Remarks, CreatedAt, UpdatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            using var command = new OleDbCommand(sql, connection);
            
            // Add parameters
            command.Parameters.AddWithValue("@DayDate", record.DayDate);
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
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);

            await command.ExecuteNonQueryAsync();

            // Get the new ID
            var getIdSql = "SELECT @@IDENTITY";
            using var getIdCommand = new OleDbCommand(getIdSql, connection);
            return Convert.ToInt32(await getIdCommand.ExecuteScalarAsync());
        }

        public async Task<bool> UpdateRecordAsync(int id, SalesRecord record)
        {
            using var connection = new OleDbConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"
                UPDATE SalesRecords SET 
                    DayDate = ?, DigiPay = ?, DigiWallet = ?, StarEC = ?, SBI = ?, SBI_J = ?, 
                    IndBank = ?, INBA = ?, IPPB = ?, IPBC = ?, Sakthi = ?, CUB = ?, TNEGA = ?, 
                    Airtel = ?, PayTM = ?, Jio = ?, TataPlay = ?, PendingNote = ?, TotCash = ?, 
                    TotCum = ?, TotalPending = ?, TodayExp = ?, TotalAll = ?, Remarks = ?, UpdatedAt = ?
                WHERE Id = ?";

            using var command = new OleDbCommand(sql, connection);
            
            // Add parameters
            command.Parameters.AddWithValue("@DayDate", record.DayDate);
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
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now);
            command.Parameters.AddWithValue("@Id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteRecordAsync(int id)
        {
            using var connection = new OleDbConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM SalesRecords WHERE Id = ?";
            using var command = new OleDbCommand(sql, connection);
            command.Parameters.AddWithValue("@Id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private SalesRecord MapToSalesRecord(OleDbDataReader reader)
        {
            return new SalesRecord
            {
                Id = reader.GetInt32("Id"),
                DayDate = reader.GetDateTime("DayDate"),
                DigiPay = reader.GetInt32("DigiPay"),
                DigiWallet = reader.GetInt32("DigiWallet"),
                StarEC = reader.GetInt32("StarEC"),
                SBI = reader.GetInt32("SBI"),
                SBI_J = reader.GetInt32("SBI_J"),
                IndBank = reader.GetInt32("IndBank"),
                INBA = reader.GetInt32("INBA"),
                IPPB = reader.GetInt32("IPPB"),
                IPBC = reader.GetInt32("IPBC"),
                Sakthi = reader.GetInt32("Sakthi"),
                CUB = reader.GetInt32("CUB"),
                TNEGA = reader.GetInt32("TNEGA"),
                Airtel = reader.GetInt32("Airtel"),
                PayTM = reader.GetInt32("PayTM"),
                Jio = reader.GetInt32("Jio"),
                TataPlay = reader.GetInt32("TataPlay"),
                PendingNote = reader.GetInt32("PendingNote"),
                TotCash = reader.GetInt32("TotCash"),
                TotCum = reader.GetInt32("TotCum"),
                TotalPending = reader.GetInt32("TotalPending"),
                TodayExp = reader.GetInt32("TodayExp"),
                TotalAll = reader.GetInt32("TotalAll"),
                Remarks = reader.IsDBNull("Remarks") ? null : reader.GetString("Remarks"),
                CreatedAt = reader.GetDateTime("CreatedAt"),
                UpdatedAt = reader.GetDateTime("UpdatedAt")
            };
        }
    }
}