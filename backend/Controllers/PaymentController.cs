using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;
using MASDigitalService.Services;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Payment Records Management")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentDatabaseService _paymentDatabaseService;

        public PaymentController(PaymentDatabaseService paymentDatabaseService)
        {
            _paymentDatabaseService = paymentDatabaseService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Get all payment records")]
        [SwaggerResponse(200, "Success", typeof(IEnumerable<PaymentRecord>))]
        public async Task<ActionResult<IEnumerable<PaymentRecord>>> GetPaymentRecords()
        {
            try
            {
                var records = await _paymentDatabaseService.GetPaymentRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Get payment by ID")]
        [SwaggerResponse(200, "Success", typeof(PaymentRecord))]
        [SwaggerResponse(404, "Not found")]
        public async Task<ActionResult<PaymentRecord>> GetPaymentById([FromRoute] int id)
        {
            try
            {
                var record = await _paymentDatabaseService.GetPaymentByIdAsync(id);
                if (record == null)
                    return NotFound($"Payment with ID {id} not found");
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Create payment")]
        [SwaggerResponse(201, "Created", typeof(PaymentRecord))]
        public async Task<ActionResult<PaymentRecord>> CreatePayment([FromBody] PaymentRecord paymentRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _paymentDatabaseService.CreatePaymentAsync(paymentRecord);
                return CreatedAtAction(nameof(GetPaymentById), new { id = createdRecord.Id }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Update payment")]
        [SwaggerResponse(200, "Updated", typeof(PaymentRecord))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> UpdatePayment([FromRoute] int id, [FromBody] PaymentRecord paymentRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingRecord = await _paymentDatabaseService.GetPaymentByIdAsync(id);
                if (existingRecord == null)
                    return NotFound($"Payment with ID {id} not found");

                var updatedRecord = await _paymentDatabaseService.UpdatePaymentAsync(id, paymentRecord);
                return Ok(updatedRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Delete payment")]
        [SwaggerResponse(204, "Deleted")]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> DeletePayment([FromRoute] int id)
        {
            try
            {
                var success = await _paymentDatabaseService.DeletePaymentAsync(id);
                if (!success)
                    return NotFound($"Payment with ID {id} not found");
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}