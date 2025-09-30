using Microsoft.AspNetCore.Mvc;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        [HttpPost("area")]
        public IActionResult CalculateArea([FromBody] AreaCalculationRequest request)
        {
            var totalHectares = request.Hectares.Sum();
            var totalAres = request.Ares.Sum();
            var totalInAcres = (totalHectares * 2.471) + (totalAres * 2.471 / 100);

            return Ok(new
            {
                TotalHectares = totalHectares + totalAres,
                TotalAcres = Math.Round(totalInAcres, 3)
            });
        }

        [HttpPost("percentage")]
        public IActionResult CalculatePercentage([FromBody] PercentageRequest request)
        {
            var totalMarks = request.Marks.Sum();
            var totalMaxMarks = request.MaxMarks.Sum();
            var percentage = totalMaxMarks > 0 ? (double)totalMarks / totalMaxMarks * 100 : 0;

            return Ok(new
            {
                TotalMarks = totalMarks,
                TotalMaxMarks = totalMaxMarks,
                Percentage = Math.Round(percentage, 2)
            });
        }
    }

    public class AreaCalculationRequest
    {
        public List<double> Hectares { get; set; } = new();
        public List<double> Ares { get; set; } = new();
    }

    public class PercentageRequest
    {
        public List<int> Marks { get; set; } = new();
        public List<int> MaxMarks { get; set; } = new();
    }
}