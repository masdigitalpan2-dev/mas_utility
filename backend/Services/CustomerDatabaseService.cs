using Microsoft.Data.Sqlite;
using MASDigitalService.Models;

namespace MASDigitalService.Services
{
    public class CustomerDatabaseService
    {
        private readonly string _connectionString;

        public CustomerDatabaseService()
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
                CREATE TABLE IF NOT EXISTS customers (
                    CustomerId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Name TEXT NOT NULL,
                    Phone INTEGER,
                    Email TEXT,
                    Address TEXT,
                    FatherHusbandName TEXT,
                    Place TEXT,
                    EbNumber INTEGER,
                    DthNumber INTEGER,
                    DthProvider TEXT,
                    Aadhar INTEGER,
                    CustomerType TEXT,
                    Notes TEXT,
                    Photo TEXT,
                    CreatedBy TEXT,
                    CreatedAt datetime NOT NULL,
                    UpdatedAt datetime NOT NULL
                )";

            using var command = new SqliteCommand(createTableSql, connection);
            command.ExecuteNonQuery();
        }

        public async Task<List<CustomerRecord>> GetCustomerRecordsAsync()
        {
            var records = new List<CustomerRecord>();
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM customers ORDER BY Name";
            using var command = new SqliteCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                records.Add(MapToCustomerRecord(reader));
            }
            return records;
        }

        public async Task<CustomerRecord?> GetCustomerByIdAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "SELECT * FROM customers WHERE CustomerId = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapToCustomerRecord(reader);
            }
            return null;
        }

        public async Task<CustomerRecord> CreateCustomerAsync(CustomerRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"INSERT INTO customers (Name, Phone, Email, Address, FatherHusbandName, Place, EbNumber, DthNumber, DthProvider, Aadhar, CustomerType, Notes, Photo, CreatedBy, CreatedAt, UpdatedAt) 
                       VALUES (@Name, @Phone, @Email, @Address, @FatherHusbandName, @Place, @EbNumber, @DthNumber, @DthProvider, @Aadhar, @CustomerType, @Notes, @Photo, @CreatedBy, @CreatedAt, @UpdatedAt);
                       SELECT last_insert_rowid();";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Name", record.Name);
            command.Parameters.AddWithValue("@Phone", record.Phone ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Email", record.Email ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Address", record.Address ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@FatherHusbandName", record.FatherHusbandName ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Place", record.Place ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@EbNumber", record.EbNumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@DthNumber", record.DthNumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@DthProvider", record.DthProvider ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Aadhar", record.Aadhar ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@CustomerType", record.CustomerType ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Notes", record.Notes ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Photo", record.Photo ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@CreatedBy", record.CreatedBy ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@CreatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var newId = Convert.ToInt32(await command.ExecuteScalarAsync());
            record.CustomerId = newId;
            return record;
        }

        public async Task<CustomerRecord?> UpdateCustomerAsync(int id, CustomerRecord record)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = @"UPDATE customers SET Name=@Name, Phone=@Phone, Email=@Email, Address=@Address, FatherHusbandName=@FatherHusbandName, Place=@Place, EbNumber=@EbNumber, DthNumber=@DthNumber, DthProvider=@DthProvider, Aadhar=@Aadhar, CustomerType=@CustomerType, Notes=@Notes, Photo=@Photo, UpdatedAt=@UpdatedAt WHERE CustomerId=@Id";
            
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@Name", record.Name);
            command.Parameters.AddWithValue("@Phone", record.Phone ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Email", record.Email ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Address", record.Address ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@FatherHusbandName", record.FatherHusbandName ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Place", record.Place ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@EbNumber", record.EbNumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@DthNumber", record.DthNumber ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@DthProvider", record.DthProvider ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Aadhar", record.Aadhar ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@CustomerType", record.CustomerType ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Notes", record.Notes ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Photo", record.Photo ?? (object)DBNull.Value);
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0 ? await GetCustomerByIdAsync(id) : null;
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            using var connection = new SqliteConnection(_connectionString);
            await connection.OpenAsync();

            var sql = "DELETE FROM customers WHERE CustomerId = @id";
            using var command = new SqliteCommand(sql, connection);
            command.Parameters.AddWithValue("@id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }

        private CustomerRecord MapToCustomerRecord(SqliteDataReader reader)
        {
            return new CustomerRecord
            {
                CustomerId = Convert.ToInt32(reader["CustomerId"]),
                Name = reader["Name"].ToString(),
                Phone = reader["Phone"] == DBNull.Value ? null : Convert.ToInt64(reader["Phone"]),
                Email = reader["Email"]?.ToString(),
                Address = reader["Address"]?.ToString(),
                FatherHusbandName = reader["FatherHusbandName"]?.ToString(),
                Place = reader["Place"]?.ToString(),
                EbNumber = reader["EbNumber"] == DBNull.Value ? null : Convert.ToInt64(reader["EbNumber"]),
                DthNumber = reader["DthNumber"] == DBNull.Value ? null : Convert.ToInt64(reader["DthNumber"]),
                DthProvider = reader["DthProvider"]?.ToString(),
                Aadhar = reader["Aadhar"] == DBNull.Value ? null : Convert.ToInt64(reader["Aadhar"]),
                CustomerType = reader["CustomerType"]?.ToString(),
                Notes = reader["Notes"]?.ToString(),
                Photo = reader["Photo"]?.ToString(),
                CreatedBy = reader["CreatedBy"]?.ToString(),
                CreatedAt = DateTime.Parse(reader["CreatedAt"].ToString()),
                UpdatedAt = DateTime.Parse(reader["UpdatedAt"].ToString())
            };
        }
    }
}