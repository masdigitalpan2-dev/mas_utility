using Microsoft.Data.Sqlite;
using MASDigitalService.Models;

namespace MASDigitalService.Services
{
    public class PasswordDatabaseService
    {
        private readonly string _connectionString;

        public PasswordDatabaseService()
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
                CREATE TABLE IF NOT EXISTS passwords (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ServiceName TEXT NOT NULL,
                    Username TEXT NOT NULL,
                    Password TEXT NOT NULL,
                    Website TEXT,
                    Category TEXT,
                    Notes TEXT,
                    CreatedAt datetime NOT NULL,
                    UpdatedAt datetime NOT NULL
                )";

            using var command = new SqliteCommand(createTableSql, connection);
            command.ExecuteNonQuery();
        }

        public async Task<List<PasswordRecord>> GetPasswordRecordsAsync()
        {
            var records = new List<PasswordRecord>();
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM passwords ORDER BY ServiceName";
            using var command = new SqliteCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToPasswordRecord(reader));
            }
            return records;
        }

        public async Task<PasswordRecord?> GetPasswordByIdAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM passwords WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToPasswordRecord(reader);
            }
            return null;
        }

        public async Task<PasswordRecord> CreatePasswordAsync(PasswordRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"INSERT INTO passwords (ServiceName, Username, Password, Website, Category, Notes, CreatedAt, UpdatedAt) 
                       VALUES (@ServiceName, @Username, @Password, @Website, @Category, @Notes, @CreatedAt, @UpdatedAt);
                       SELECT last_insert_rowid();";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@ServiceName", record.ServiceName);
            command.Parameters.AddWithValue("@Username", record.Username);
            command.Parameters.AddWithValue("@Password", record.Password);
            command.Parameters.AddWithValue("@Website", record.Website ?? "");
            command.Parameters.AddWithValue("@Category", record.Category ?? "");
            command.Parameters.AddWithValue("@Notes", record.Notes ?? "");
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var newId = Convert.ToInt32(await command.ExecuteScalarAsync());
            record.Id = newId;
            return record;
        }

        public async Task<PasswordRecord?> UpdatePasswordAsync(int id, PasswordRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"UPDATE passwords SET ServiceName=@ServiceName, Username=@Username, Password=@Password, Website=@Website, Category=@Category, Notes=@Notes, UpdatedAt=@UpdatedAt WHERE Id=@Id";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@ServiceName", record.ServiceName);
            command.Parameters.AddWithValue("@Username", record.Username);
            command.Parameters.AddWithValue("@Password", record.Password);
            command.Parameters.AddWithValue("@Website", record.Website ?? "");
            command.Parameters.AddWithValue("@Category", record.Category ?? "");
            command.Parameters.AddWithValue("@Notes", record.Notes ?? "");
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0 ? await GetPasswordByIdAsync(id) : null;
        }

        public async Task<bool> DeletePasswordAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM passwords WHERE Id = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private PasswordRecord MapToPasswordRecord(SqliteDataReader reader)
        {
            return new PasswordRecord
            {
                Id = Convert.ToInt32(reader["Id"]),
                ServiceName = reader["ServiceName"].ToString(),
                Username = reader["Username"].ToString(),
                Password = reader["Password"].ToString(),
                Website = reader["Website"]?.ToString(),
                Category = reader["Category"]?.ToString(),
                Notes = reader["Notes"]?.ToString(),
                CreatedAt = DateTime.Parse(reader["CreatedAt"].ToString()),
                UpdatedAt = DateTime.Parse(reader["UpdatedAt"].ToString())
            };
        }
    }
}