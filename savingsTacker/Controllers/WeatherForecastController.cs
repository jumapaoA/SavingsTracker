using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Models;

namespace savingsTacker.Controllers
{    
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationDbContext _DbContext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _DbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<ApplicationUser> Get()
        {
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = Random.Shared.Next(-20, 55),
            //    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            //})
            //.ToArray();

            _logger.LogInformation("Inside the GetAllUser method in weatherforecast class.");

            var Users = _DbContext.Users.ToList();

            return Users;
        }
    }
}