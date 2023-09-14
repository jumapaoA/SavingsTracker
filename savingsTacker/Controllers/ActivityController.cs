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
    [ApiController]
    public class ActivityController : ControllerBase
    {
        public readonly IActivityLogRepository _ActivityLog;

        public ActivityController(IActivityLogRepository activityLog)
        {
            _ActivityLog = activityLog;
        }

        #region Getters that Returns an ActivityLog Type

        [HttpGet]
        [Route("[controller]/{userId:guid}")]
        public IEnumerable<ActivityLog> GetActivityLogByUser(string userId)
        {
            return _ActivityLog.GetUserActivity(userId);
        }

        #endregion

    }
}
