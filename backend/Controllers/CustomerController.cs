using Microsoft.AspNetCore.Mvc;
using MASDigitalService.Models;

namespace MASDigitalService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private static List<Customer> _customers = new();
        private static List<DaySale> _daySales = new();
        private static List<MonthlyExpense> _expenses = new();

        [HttpPost("customer")]
        public IActionResult CreateCustomer([FromBody] Customer customer)
        {
            customer.Id = _customers.Count + 1;
            _customers.Add(customer);
            return Ok(new { message = "Customer created successfully", id = customer.Id });
        }

        [HttpGet("customers")]
        public IActionResult GetCustomers()
        {
            return Ok(_customers);
        }

        [HttpPost("daysale")]
        public IActionResult CreateDaySale([FromBody] DaySale sale)
        {
            sale.Id = _daySales.Count + 1;
            _daySales.Add(sale);
            return Ok(new { message = "Sale recorded successfully", id = sale.Id });
        }

        [HttpGet("daysales")]
        public IActionResult GetDaySales([FromQuery] DateTime? date)
        {
            var sales = date.HasValue 
                ? _daySales.Where(s => s.Date.Date == date.Value.Date).ToList()
                : _daySales;
            return Ok(sales);
        }

        [HttpPost("expense")]
        public IActionResult CreateExpense([FromBody] MonthlyExpense expense)
        {
            expense.Id = _expenses.Count + 1;
            _expenses.Add(expense);
            return Ok(new { message = "Expense recorded successfully", id = expense.Id });
        }

        [HttpGet("expenses")]
        public IActionResult GetExpenses([FromQuery] int? month, [FromQuery] int? year)
        {
            var expenses = _expenses.AsQueryable();
            
            if (month.HasValue)
                expenses = expenses.Where(e => e.Date.Month == month.Value);
            
            if (year.HasValue)
                expenses = expenses.Where(e => e.Date.Year == year.Value);
                
            return Ok(expenses.ToList());
        }

        [HttpGet("reports/daily")]
        public IActionResult GetDailyReport([FromQuery] DateTime date)
        {
            var sales = _daySales.Where(s => s.Date.Date == date.Date);
            var totalAmount = sales.Sum(s => s.Amount);
            var totalTransactions = sales.Count();
            
            return Ok(new
            {
                Date = date.Date,
                TotalAmount = totalAmount,
                TotalTransactions = totalTransactions,
                Sales = sales.ToList()
            });
        }
    }
}