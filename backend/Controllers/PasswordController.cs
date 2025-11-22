using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;
using MASDigitalService.Services;
using Swashbuckle.AspNetCore.Annotations;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Password Records Management")]
    public class PasswordController : ControllerBase
    {
        private readonly PasswordDatabaseService _passwordDatabaseService;

        public PasswordController(PasswordDatabaseService passwordDatabaseService)
        {
            _passwordDatabaseService = passwordDatabaseService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Get all password records")]
        [SwaggerResponse(200, "Success", typeof(IEnumerable<PasswordRecord>))]
        public async Task<ActionResult<IEnumerable<PasswordRecord>>> GetPasswordRecords()
        {
            try
            {
                var records = await _passwordDatabaseService.GetPasswordRecordsAsync();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Get password by ID")]
        [SwaggerResponse(200, "Success", typeof(PasswordRecord))]
        [SwaggerResponse(404, "Not found")]
        public async Task<ActionResult<PasswordRecord>> GetPasswordById([FromRoute] int id)
        {
            try
            {
                var record = await _passwordDatabaseService.GetPasswordByIdAsync(id);
                if (record == null)
                    return NotFound($"Password with ID {id} not found");
                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Create password")]
        [SwaggerResponse(201, "Created", typeof(PasswordRecord))]
        public async Task<ActionResult<PasswordRecord>> CreatePassword([FromBody] PasswordRecord passwordRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _passwordDatabaseService.CreatePasswordAsync(passwordRecord);
                return CreatedAtAction(nameof(GetPasswordById), new { id = createdRecord.Id }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Update password")]
        [SwaggerResponse(200, "Updated", typeof(PasswordRecord))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> UpdatePassword([FromRoute] int id, [FromBody] PasswordRecord passwordRecord)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingRecord = await _passwordDatabaseService.GetPasswordByIdAsync(id);
                if (existingRecord == null)
                    return NotFound($"Password with ID {id} not found");

                var updatedRecord = await _passwordDatabaseService.UpdatePasswordAsync(id, passwordRecord);
                return Ok(updatedRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Delete password")]
        [SwaggerResponse(204, "Deleted")]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> DeletePassword([FromRoute] int id)
        {
            try
            {
                var success = await _passwordDatabaseService.DeletePasswordAsync(id);
                if (!success)
                    return NotFound($"Password with ID {id} not found");
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}