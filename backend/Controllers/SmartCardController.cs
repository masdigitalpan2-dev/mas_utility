using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SmartCardController : ControllerBase
    {
        private static List<SmartCard> _smartCards = new();

        [HttpPost]
        public IActionResult CreateSmartCard([FromBody] SmartCard smartCard)
        {
            smartCard.Id = _smartCards.Count + 1;
            _smartCards.Add(smartCard);
            return Ok(new { message = "Smart card created successfully", id = smartCard.Id });
        }

        [HttpGet]
        public IActionResult GetSmartCards()
        {
            return Ok(_smartCards);
        }

        [HttpGet("{id}")]
        public IActionResult GetSmartCard(int id)
        {
            var card = _smartCards.FirstOrDefault(c => c.Id == id);
            if (card == null) return NotFound();
            return Ok(card);
        }
    }
}