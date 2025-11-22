using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;
using MASDigitalService.Services;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Expense Records Management - CRUD operations for daily expense data")]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseDatabaseService _expenseDatabaseService;

        public ExpenseController(ExpenseDatabaseService expenseDatabaseService)
        {
            _expenseDatabaseService = expenseDatabaseService;
        }

        [HttpGet]
        [SwaggerOperation(
            Summary = "Get all expense records",
            Description = "Retrieves all expense records ordered by date (newest first)",
            OperationId = "GetAllExpenseRecords",
            Tags = new[] { "Expense Records" }
        )]
        [SwaggerResponse(200, "Successfully retrieved expense records", typeof(IEnumerable<ExpenseRecord>))]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<ActionResult<IEnumerable<ExpenseRecord>>> GetExpenseRecords()
        {
            try
            {
                var records = await _expenseDatabaseService.GetExpenseRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving expense data: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(
            Summary = "Get expense record by ID",
            Description = "Retrieves a specific expense record by ID",
            OperationId = "GetExpenseRecordById",
            Tags = new[] { "Expense Records" }
        )]
        [SwaggerResponse(200, "Successfully retrieved the expense record", typeof(ExpenseRecord))]
        [SwaggerResponse(404, "Expense record not found")]
        [SwaggerResponse(400, "Invalid ID format")]
        public async Task<ActionResult<ExpenseRecord>> GetExpenseRecordById([FromRoute] int id)
        {
            try
            {
                var record = await _expenseDatabaseService.GetExpenseByIdAsync(id);
                if (record == null)
                    return NotFound($"Expense record with ID {id} not found");
                
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving expense data: {ex.Message}");
            }
        }

        [HttpPost]
        [SwaggerOperation(
            Summary = "Create new expense record",
            Description = "Creates a new expense record",
            OperationId = "CreateExpenseRecord",
            Tags = new[] { "Expense Records" }
        )]
        [SwaggerResponse(201, "Expense record created successfully", typeof(ExpenseRecord))]
        [SwaggerResponse(400, "Invalid expense record data")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<ActionResult<ExpenseRecord>> CreateExpenseRecord([FromBody] ExpenseRecord expenseRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _expenseDatabaseService.CreateExpenseAsync(expenseRecord);
                return CreatedAtAction(nameof(GetExpenseRecordById), new { id = createdRecord.Id }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating expense record: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(
            Summary = "Update expense record",
            Description = "Updates an existing expense record",
            OperationId = "UpdateExpenseRecord",
            Tags = new[] { "Expense Records" }
        )]
        [SwaggerResponse(200, "Expense record updated successfully", typeof(ExpenseRecord))]
        [SwaggerResponse(404, "Expense record not found")]
        [SwaggerResponse(400, "Invalid expense record data")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> UpdateExpenseRecord([FromRoute] int id, [FromBody] ExpenseRecord expenseRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingRecord = await _expenseDatabaseService.GetExpenseByIdAsync(id);
                if (existingRecord == null)
                    return NotFound($"Expense record with ID {id} not found");

                var updatedRecord = await _expenseDatabaseService.UpdateExpenseAsync(id, expenseRecord);
                return Ok(updatedRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating expense record: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(
            Summary = "Delete expense record",
            Description = "Permanently deletes an expense record by its unique identifier",
            OperationId = "DeleteExpenseRecord",
            Tags = new[] { "Expense Records" }
        )]
        [SwaggerResponse(204, "Expense record deleted successfully")]
        [SwaggerResponse(404, "Expense record not found")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<IActionResult> DeleteExpenseRecord([FromRoute] int id)
        {
            try
            {
                var success = await _expenseDatabaseService.DeleteExpenseAsync(id);
                if (!success)
                    return NotFound($"Expense record with ID {id} not found");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting expense record: {ex.Message}");
            }
        }
    }
}