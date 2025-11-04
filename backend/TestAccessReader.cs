using System.Data.OleDb;

namespace MASDigitalService
{
    public class TestAccessReader
    {
        public static void TestConnection()
        {
            var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "mas.accdb");
            var connectionString = $"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={dbPath};";

            try
            {
                using var connection = new OleDbConnection(connectionString);
                connection.Open();
                Console.WriteLine("✓ Successfully connected to Access database");

                // Get table names
                var tables = connection.GetSchema("Tables");
                Console.WriteLine("\nTables found:");
                foreach (System.Data.DataRow row in tables.Rows)
                {
                    var tableName = row["TABLE_NAME"].ToString();
                    var tableType = row["TABLE_TYPE"].ToString();
                    if (tableType == "TABLE")
                        Console.WriteLine($"  - {tableName}");
                }

                // Try to read from daysale table
                var sql = "SELECT TOP 5 * FROM daysale";
                using var command = new OleDbCommand(sql, connection);
                using var reader = command.ExecuteReader();

                Console.WriteLine("\nSample data from daysale table:");
                var columnCount = reader.FieldCount;
                
                // Print column headers
                for (int i = 0; i < columnCount; i++)
                {
                    Console.Write($"{reader.GetName(i)}\t");
                }
                Console.WriteLine();

                // Print data rows
                int rowCount = 0;
                while (reader.Read() && rowCount < 3)
                {
                    for (int i = 0; i < columnCount; i++)
                    {
                        Console.Write($"{reader[i]}\t");
                    }
                    Console.WriteLine();
                    rowCount++;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"✗ Error: {ex.Message}");
            }
        }
    }
}