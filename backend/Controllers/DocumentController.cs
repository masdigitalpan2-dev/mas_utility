using Microsoft.AspNetCore.Mvc;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        [HttpPost("generate-pdf")]
        public IActionResult GeneratePDF([FromBody] DocumentRequest request)
        {
            // PDF generation logic would go here
            return Ok(new { message = "PDF generated successfully", documentId = Guid.NewGuid() });
        }

        [HttpPost("process-image")]
        public IActionResult ProcessImage([FromForm] IFormFile file, [FromForm] string operation)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            // Image processing logic would go here
            return Ok(new { 
                message = $"Image {operation} completed successfully",
                originalSize = file.Length,
                processedSize = file.Length * 0.8 // Mock compression
            });
        }

        [HttpGet("forms/{formType}")]
        public IActionResult GetForm(string formType)
        {
            var forms = new Dictionary<string, string>
            {
                ["eseva"] = "E-Seva Application Form",
                ["aadhar"] = "Aadhar Update Form",
                ["voter"] = "Voter Registration Form",
                ["smartcard"] = "Smart Card Application Form"
            };

            if (forms.ContainsKey(formType.ToLower()))
            {
                return Ok(new { formName = forms[formType.ToLower()], formType });
            }

            return NotFound("Form not found");
        }
    }

    public class DocumentRequest
    {
        public string DocumentType { get; set; } = string.Empty;
        public Dictionary<string, object> Data { get; set; } = new();
    }
}