using Microsoft.Data.Sqlite;
using MASDigitalService.Models;

namespace MASDigitalService.Services
{
    public class ExpenseDatabaseService
    {
        private readonly string _connectionString;

        public ExpenseDatabaseService()
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
                CREATE TABLE IF NOT EXISTS expenses (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Date TEXT NOT NULL,
                    Category TEXT NOT NULL,
                    Amount DECIMAL NOT NULL,
                    Description TEXT,
                    CreatedAt TEXT NOT NULL,
                    UpdatedAt TEXT NOT NULL
                )";

            using var command = new SqliteCommand(createTableSql, connection);
            command.ExecuteNonQuery();
        }

        public async Task<List<ExpenseRecord>> GetExpenseRecordsAsync()
        {
            var records = new List<ExpenseRecord>();
            
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM expenses ORDER BY Date DESC";
            using var command = new SqliteCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToExpenseRecord(reader));
            }

            return records;
        }

        public async Task<ExpenseRecord?> GetExpenseByIdAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM expenses WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToExpenseRecord(reader);
            }

            return null;
        }

        public async Task<ExpenseRecord> CreateExpenseAsync(ExpenseRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"INSERT INTO expenses (Date, Category, Amount, Description, CreatedAt, UpdatedAt) 
                       VALUES (@Date, @Category, @Amount, @Description, @CreatedAt, @UpdatedAt);
                       SELECT last_insert_rowid();";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Date", record.Date.ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@Category", record.Category);
            command.Parameters.AddWithValue("@Amount", record.Amount);
            command.Parameters.AddWithValue("@Description", record.Description ?? "");
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var newId = Convert.ToInt32(await command.ExecuteScalarAsync());
            record.Id = newId;
            return record;
        }

        public async Task<ExpenseRecord?> UpdateExpenseAsync(int id, ExpenseRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"UPDATE expenses SET Date=@Date, Category=@Category, Amount=@Amount, Description=@Description, UpdatedAt=@UpdatedAt WHERE Id=@Id";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Date", record.Date.ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@Category", record.Category);
            command.Parameters.AddWithValue("@Amount", record.Amount);
            command.Parameters.AddWithValue("@Description", record.Description ?? "");
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0 ? await GetExpenseByIdAsync(id) : null;
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM expenses WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private ExpenseRecord MapToExpenseRecord(SqliteDataReader reader)
        {
            return new ExpenseRecord
            {
                Id = Convert.ToInt32(reader["Id"]),
                Date = DateTime.Parse(reader["Date"].ToString()),
                Category = reader["Category"].ToString(),
                Amount = Convert.ToDecimal(reader["Amount"]),
                Description = reader["Description"]?.ToString(),
                CreatedAt = DateTime.Parse(reader["CreatedAt"].ToString()),
                UpdatedAt = DateTime.Parse(reader["UpdatedAt"].ToString())
            };
        }
    }
}