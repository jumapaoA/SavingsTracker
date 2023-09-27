using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;
using System.Linq;

namespace savingsTacker.Controllers
{
    [Controller]
    public class SavingsController : ControllerBase
    {
        public readonly ILogger<Saving> _Logger;
        public readonly ApplicationDbContext _DbContext;
        public readonly IGroupSavingsRepository _GroupSavings;
        public readonly ISavingsRepository _Savings;
        public readonly IActivityLogRepository _ActivityLog;

        public SavingsController(ILogger<Saving> logger, ApplicationDbContext dbContext, IGroupSavingsRepository groupSavings, ISavingsRepository savings, IActivityLogRepository activityLog)
        {
            _Logger = logger;
            _DbContext = dbContext;
            _GroupSavings = groupSavings;
            _Savings = savings;
            _ActivityLog = activityLog;
        }

        #region Getters that Returns a Saving Type

        [HttpGet]
        [Route("[controller]")]
        public IEnumerable<Saving> GetAllSavings()
        {
            return _Savings.GetAllSavings();
        }

        [HttpGet]
        [Route("[controller]/user/{userId:guid}")]
        public IEnumerable<Saving> GetSavingsByUserId(string userId)
        {
            return _Savings.GetSavingsByUserId(userId);
        }

        [HttpGet]
        [Route("[controller]/{savingId:int}")]
        public Saving? GetSavingBySavingId(int savingId)
        {
            return _Savings.GetSavingsById(savingId);
        }

        [HttpGet]
        [Route("[controller]/group/{groupId:int}")]
        public IEnumerable<Saving> GetSavingsByGroupId(int groupId)
        {
            return _GroupSavings.GetSavingsByGroupId(groupId);
        }

        [HttpGet]
        [Route("[controller]/group-savings/{userId:guid}")]
        public IEnumerable<Saving> GetAllGroupSavingsByUserId(string userId)
        {
            return _GroupSavings.GetAllGroupSavingsByUserId(userId);
        }

        #endregion

        #region Create Data for Savings

        [HttpPost]
        [Route("/[controller]/create")]
        public IActionResult CreateSaving()
        {
            DateTime currentDate = DateTime.Now;

            var Savings = new Saving()
            {
                Amount = decimal.Parse(Request.Form["Amount"].ToString()),
                UserId = Request.Form["UserId"].ToString(),
                Description = Request.Form["Description"].ToString(),
                DateContributed = currentDate,
                IsActive = true
            };

            _Savings.AddSaving(Savings);
            AddActivity($"Added a new savings.");

            return Ok(User);
        }

        #endregion

        #region Update and Remove Data from Savings

        [HttpPatch]
        [Route("[controller]/update/{savingId:int}")]
        public IActionResult UpdateSavings(int savingId)
        {
            var Saving = _Savings.GetSavingsById(savingId);
            if (Saving == null) 
            {
                return NotFound();
            }

            DateTime currentDate = DateTime.Now;

            Saving.DateUpdated = currentDate;
            Saving.UserUpdated = Request.Form["UserId"].ToString();
            Saving.Amount = decimal.Parse(Request.Form["Amount"].ToString());
            Saving.Description = Request.Form["Description"].ToString();
            Saving.IsActive = Boolean.Parse(Request.Form["IsActive"].ToString());
            
            _Savings.UpdateSavings(Saving);

            AddActivity($"Updated savings with an ID of {savingId}");
            return Ok(Saving);
        }
        #endregion

        public ActivityLog AddActivity(string message)
        {
            Random Random = new Random();

            var Activity = new ActivityLog()
            {
                UserId = Request.Form["UserId"].ToString(),
                Message = message,
                DateAccess = DateTime.Now
            };

            _ActivityLog.AddActivity(Activity);
            _Logger.LogInformation($"New activity has been listed.");

            return Activity;
        }
    }
}
