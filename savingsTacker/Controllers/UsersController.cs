using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Models;

namespace savingsTacker.Controllers
{    
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _Logger;
        private readonly ApplicationDbContext _DbContext;

        public UsersController(ILogger<UsersController> logger, ApplicationDbContext dbContext)
        {
            _Logger = logger;
            _DbContext = dbContext;
        }

        [HttpGet]
        [Route("[controller]")]
        public IEnumerable<ApplicationUser> GetAllUser()
        {
            _Logger.LogInformation("Inside the GetAllUser method.");

            var Users = _DbContext.Users.ToList();

            return Users;
        }

        [HttpGet]
        [Route("/[controller]/{userId:guid}")]
        public ApplicationUser GetUserById(string userId)
        {
            _Logger.LogInformation("Inside the GetUserById method.");

            var Result = _DbContext.Users.ToList().FirstOrDefault(User => User.Id.Equals(userId));

            return Result;
        }
    }
}