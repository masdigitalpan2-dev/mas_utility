using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;
using MASDigitalService.Services;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Customer Records Management")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDatabaseService _customerDatabaseService;

        public CustomerController(CustomerDatabaseService customerDatabaseService)
        {
            _customerDatabaseService = customerDatabaseService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Get all customer records")]
        [SwaggerResponse(200, "Success", typeof(IEnumerable<CustomerRecord>))]
        public async Task<ActionResult<IEnumerable<CustomerRecord>>> GetCustomerRecords()
        {
            try
            {
                var records = await _customerDatabaseService.GetCustomerRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Get customer by ID")]
        [SwaggerResponse(200, "Success", typeof(CustomerRecord))]
        [SwaggerResponse(404, "Not found")]
        public async Task<ActionResult<CustomerRecord>> GetCustomerById([FromRoute] int id)
        {
            try
            {
                var record = await _customerDatabaseService.GetCustomerByIdAsync(id);
                if (record == null)
                    return NotFound($"Customer with ID {id} not found");
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Create customer")]
        [SwaggerResponse(201, "Created", typeof(CustomerRecord))]
        public async Task<ActionResult<CustomerRecord>> CreateCustomer([FromBody] CustomerRecord customerRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _customerDatabaseService.CreateCustomerAsync(customerRecord);
                return CreatedAtAction(nameof(GetCustomerById), new { id = createdRecord.CustomerId }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Update customer")]
        [SwaggerResponse(200, "Updated", typeof(CustomerRecord))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] int id, [FromBody] CustomerRecord customerRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingRecord = await _customerDatabaseService.GetCustomerByIdAsync(id);
                if (existingRecord == null)
                    return NotFound($"Customer with ID {id} not found");

                var updatedRecord = await _customerDatabaseService.UpdateCustomerAsync(id, customerRecord);
                return Ok(updatedRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Delete customer")]
        [SwaggerResponse(204, "Deleted")]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            try
            {
                var success = await _customerDatabaseService.DeleteCustomerAsync(id);
                if (!success)
                    return NotFound($"Customer with ID {id} not found");
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}