using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;
using MASDigitalService.Services;
using System.ComponentModel.DataAnnotations;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Sales Records Management - CRUD operations for daily sales data")]
    public class SalesController : ControllerBase
    {
        private readonly AccessDatabaseService _accessDatabaseService;

        public SalesController(AccessDatabaseService accessDatabaseService)
        {
            _accessDatabaseService = accessDatabaseService;
        }

        [HttpGet]
        [SwaggerOperation(
            Summary = "Get all sales records from daysale table",
            Description = "Retrieves all daily sales records from Access database daysale table ordered by date (newest first)",
            OperationId = "GetAllSalesRecords",
            Tags = new[] { "Sales Records" }
        )]
        [SwaggerResponse(200, "Successfully retrieved sales records", typeof(IEnumerable<SalesRecord>))]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<ActionResult<IEnumerable<SalesRecord>>> GetSalesRecords()
        {
            try
            {
                var records = await _accessDatabaseService.GetDaySaleRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving data from daysale table: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(
            Summary = "Get sales record by ID",
            Description = "Retrieves a specific sales record from daysale table by ID",
            OperationId = "GetSalesRecordById",
            Tags = new[] { "Sales Records" }
        )]
        [SwaggerResponse(200, "Successfully retrieved the sales record", typeof(SalesRecord))]
        [SwaggerResponse(404, "Sales record not found")]
        [SwaggerResponse(400, "Invalid ID format")]
        public async Task<ActionResult<SalesRecord>> GetSalesRecordById([FromRoute] int id)
        {
            try
            {
                var record = await _accessDatabaseService.GetDaySaleByIdAsync(id);
                if (record == null)
                    return NotFound($"Sales record with ID {id} not found");
                
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving data: {ex.Message}");
            }
        }

        [HttpGet("date/{date}")]
        [SwaggerOperation(
            Summary = "Get sales record by date",
            Description = "Retrieves a specific sales record from daysale table by date",
            OperationId = "GetSalesRecordByDate",
            Tags = new[] { "Sales Records" }
        )]
        [SwaggerResponse(200, "Successfully retrieved the sales record", typeof(SalesRecord))]
        [SwaggerResponse(404, "Sales record not found")]
        [SwaggerResponse(400, "Invalid date format")]
        public async Task<ActionResult<SalesRecord>> GetSalesRecordByDate([FromRoute] DateTime date)
        {
            try
            {
                var record = await _accessDatabaseService.GetDaySaleByDateAsync(date);
                if (record == null)
                    return NotFound($"Sales record for date {date:yyyy-MM-dd} not found");
                
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving data: {ex.Message}");
            }
        }

        [HttpPost]
        [SwaggerOperation(
            Summary = "Create new sales record",
            Description = "Creates a new daily sales record. Totals are automatically calculated from individual payment amounts.",
            OperationId = "CreateSalesRecord",
            Tags = new[] { "Sales Records" }
        )]

        [SwaggerResponse(201, "Sales record created successfully", typeof(SalesRecord))]
        [SwaggerResponse(400, "Invalid sales record data")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<ActionResult<SalesRecord>> CreateSalesRecord([FromBody] SalesRecord salesRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Calculate totals
                salesRecord.TotCum = salesRecord.DigiPay + salesRecord.DigiWallet + salesRecord.StarEC + 
                                   salesRecord.SBI + salesRecord.IndBank + salesRecord.INBA + salesRecord.Airtel + 
                                   salesRecord.PayTM + salesRecord.Jio + salesRecord.TataPlay + salesRecord.IPPB + 
                                   salesRecord.IPBC + salesRecord.CUB + salesRecord.Canara + salesRecord.TNEGA + 
                                   salesRecord.SBI_J;
                
                salesRecord.TotalAll = salesRecord.TotCum + salesRecord.TotCash - salesRecord.TodayExp;
                
                var createdRecord = await _accessDatabaseService.CreateDaySaleAsync(salesRecord);
                return CreatedAtAction(nameof(GetSalesRecordByDate), new { date = createdRecord.DayDate.ToString("yyyy-MM-dd") }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating record: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(
            Summary = "Update sales record",
            Description = "Updates an existing sales record. Totals are automatically recalculated from individual payment amounts.",
            OperationId = "UpdateSalesRecord",
            Tags = new[] { "Sales Records" }
        )]

        [SwaggerResponse(200, "Sales record updated successfully", typeof(SalesRecord))]
        [SwaggerResponse(404, "Sales record not found")]
        [SwaggerResponse(400, "Invalid sales record data")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> UpdateSalesRecord([FromRoute] int id, [FromBody] SalesRecord salesRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingRecord = await _accessDatabaseService.GetDaySaleByIdAsync(id);
                if (existingRecord == null)
                    return NotFound($"Sales record with ID {id} not found");

                // Calculate totals
                salesRecord.TotCum = salesRecord.DigiPay + salesRecord.DigiWallet + salesRecord.StarEC + 
                                   salesRecord.SBI + salesRecord.IndBank + salesRecord.INBA + salesRecord.Airtel + 
                                   salesRecord.PayTM + salesRecord.Jio + salesRecord.TataPlay + salesRecord.IPPB + 
                                   salesRecord.IPBC + salesRecord.CUB + salesRecord.Canara + salesRecord.TNEGA + 
                                   salesRecord.SBI_J;
                
                salesRecord.TotalAll = salesRecord.TotCum + salesRecord.TotCash - salesRecord.TodayExp;

                var updatedRecord = await _accessDatabaseService.UpdateDaySaleAsync(id, salesRecord);
                return Ok(updatedRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating record: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(
            Summary = "Delete sales record",
            Description = "Permanently deletes a sales record by its unique identifier",
            OperationId = "DeleteSalesRecord",
            Tags = new[] { "Sales Records" }
        )]

        [SwaggerResponse(204, "Sales record deleted successfully")]
        [SwaggerResponse(404, "Sales record not found")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> DeleteSalesRecord([FromRoute] int id)
        {
            try
            {
                var success = await _accessDatabaseService.DeleteDaySaleAsync(id);
                if (!success)
                    return NotFound($"Sales record with ID {id} not found");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting record: {ex.Message}");
            }
        }

        [HttpGet("filter")]
        [SwaggerOperation(
            Summary = "Filter sales records",
            Description = "Retrieves sales records filtered by date range and/or total amount range. All parameters are optional.",
            OperationId = "FilterSalesRecords",
            Tags = new[] { "Sales Records" }
        )]

//        [SwaggerResponse(200, "Successfully retrieved filtered sales records", typeof(IEnumerable<SalesRecord>))]
//        [SwaggerResponse(400, "Invalid filter parameters")]
//        [SwaggerResponse(500, "Internal server error")]
//        public async Task<ActionResult<IEnumerable<SalesRecord>>> FilterSalesRecords(
//            [FromQuery] DateTime? fromDate = null,
//            [FromQuery] DateTime? toDate = null,
//            [FromQuery] int? minAmount = null,
//            [FromQuery] int? maxAmount = null)
//        {
//            if (fromDate.HasValue && toDate.HasValue && fromDate > toDate)
//                return BadRequest("fromDate cannot be greater than toDate");

//            if (minAmount.HasValue && maxAmount.HasValue && minAmount > maxAmount)
//                return BadRequest("minAmount cannot be greater than maxAmount");

//            try
//            {
//                var filtered = new IEnumerable<SalesRecord>();
////await _accessDatabaseService.FilterDaySaleRecordsAsync(fromDate, toDate, minAmount, maxAmount);
//                return Ok(filtered);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Error filtering records: {ex.Message}");
//            }
//        }

        [HttpGet("test-connection")]
        public async Task<ActionResult<string>> TestConnection()
        {
            try
            {
                var records = await _accessDatabaseService.GetDaySaleRecordsAsync();
                return Ok($"✓ Connection successful! Found {records.Count} records in daysale table.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"✗ Connection failed: {ex.Message}");
            }
        }
    }
}