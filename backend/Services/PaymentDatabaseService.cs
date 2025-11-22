using Microsoft.Data.Sqlite;
using MASDigitalService.Models;

namespace MASDigitalService.Services
{
    public class PaymentDatabaseService
    {
        private readonly string _connectionString;

        public PaymentDatabaseService()
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
                CREATE TABLE IF NOT EXISTS payments (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Date TEXT NOT NULL,
                    CustomerId INTEGER,
                    Amount DECIMAL NOT NULL,
                    PaymentMethod TEXT,
                    Status TEXT NOT NULL DEFAULT 'Pending',
                    Description TEXT,
                    DueDate TEXT,
                    CreatedAt datetime NOT NULL,
                    UpdatedAt datetime NOT NULL,
                    FOREIGN key (CustomerId) references customers(Id)   
                )";

            using var command = new SqliteCommand(createTableSql, connection);
            command.ExecuteNonQuery();
        }

        public async Task<List<PaymentRecord>> GetPaymentRecordsAsync()
        {
            var records = new List<PaymentRecord>();
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM payments ORDER BY Date DESC";
            using var command = new SqliteCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToPaymentRecord(reader));
            }
            return records;
        }

        public async Task<PaymentRecord?> GetPaymentByIdAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM payments WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToPaymentRecord(reader);
            }
            return null;
        }

        public async Task<PaymentRecord> CreatePaymentAsync(PaymentRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"INSERT INTO payments (Date, CustomerName, Amount, PaymentMethod, Status, Description, DueDate, CreatedAt, UpdatedAt) 
                       VALUES (@Date, @CustomerName, @Amount, @PaymentMethod, @Status, @Description, @DueDate, @CreatedAt, @UpdatedAt);
                       SELECT last_insert_rowid();";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Date", record.Date.ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@CustomerName", record.CustomerName);
            command.Parameters.AddWithValue("@Amount", record.Amount);
            command.Parameters.AddWithValue("@PaymentMethod", record.PaymentMethod ?? "");
            command.Parameters.AddWithValue("@Status", record.Status);
            command.Parameters.AddWithValue("@Description", record.Description ?? "");
            command.Parameters.AddWithValue("@DueDate", record.DueDate?.ToString("yyyy-MM-dd") ?? "");
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var newId = Convert.ToInt32(await command.ExecuteScalarAsync());
            record.Id = newId;
            return record;
        }

        public async Task<PaymentRecord?> UpdatePaymentAsync(int id, PaymentRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"UPDATE payments SET Date=@Date, CustomerName=@CustomerName, Amount=@Amount, PaymentMethod=@PaymentMethod, Status=@Status, Description=@Description, DueDate=@DueDate, UpdatedAt=@UpdatedAt WHERE Id=@Id";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Date", record.Date.ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@CustomerName", record.CustomerName);
            command.Parameters.AddWithValue("@Amount", record.Amount);
            command.Parameters.AddWithValue("@PaymentMethod", record.PaymentMethod ?? "");
            command.Parameters.AddWithValue("@Status", record.Status);
            command.Parameters.AddWithValue("@Description", record.Description ?? "");
            command.Parameters.AddWithValue("@DueDate", record.DueDate?.ToString("yyyy-MM-dd") ?? "");
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0 ? await GetPaymentByIdAsync(id) : null;
        }

        public async Task<bool> DeletePaymentAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM payments WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private PaymentRecord MapToPaymentRecord(SqliteDataReader reader)
        {
            return new PaymentRecord
            {
                Id = Convert.ToInt32(reader["Id"]),
                Date = DateTime.Parse(reader["Date"].ToString()),
                CustomerName = reader["CustomerName"].ToString(),
                Amount = Convert.ToDecimal(reader["Amount"]),
                PaymentMethod = reader["PaymentMethod"]?.ToString(),
                Status = reader["Status"].ToString(),
                Description = reader["Description"]?.ToString(),
                DueDate = string.IsNullOrEmpty(reader["DueDate"]?.ToString()) ? null : DateTime.Parse(reader["DueDate"].ToString()),
                CreatedAt = DateTime.Parse(reader["CreatedAt"].ToString()),
                UpdatedAt = DateTime.Parse(reader["UpdatedAt"].ToString())
            };
        }
    }
}