using AutoMapper.Execution;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Data.Repositories.DbRepositories;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Controllers
{
    [Controller]
    public class UserController : ControllerBase
    {
        private readonly ILogger<ApplicationUser> _Logger;
        private readonly ApplicationDbContext _DbContext;
        private readonly IGroupMembersRepository _GroupMember;
        private readonly ISavingsRepository _Savings;
        private readonly IActivityLogRepository _ActivityLog;
        private readonly UserManager<ApplicationUser> _UserManager;
        private string _UploadsFolder;

        public UserController(ILogger<ApplicationUser> logger, ApplicationDbContext dbContext, IGroupMembersRepository groupMembers, ISavingsRepository savings, IActivityLogRepository activityLog, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _Logger = logger;
            _DbContext = dbContext;
            _GroupMember = groupMembers;
            _Savings = savings;
            _ActivityLog = activityLog;
            _UserManager = userManager;
            _UploadsFolder = configuration.GetValue<String>("UploadsFolder");
        }

        #region Getters that Returns an ApplicationUser Type

        [HttpGet]
        [Route("[controller]")]
        public IEnumerable<ApplicationUser> GetAllUser()
        {
            _Logger.LogInformation("Inside the GetAllUser method.");

            var Users = _DbContext.Users.ToList();

            return Users;
        }

        [HttpGet]
        [Route("[controller]/{userId:guid}")]
        public ApplicationUser GetUserById(string userId)
        {
            _Logger.LogInformation("Inside the GetUserById method.");

            var Result = _DbContext.Users.ToList().FirstOrDefault(User => User.Id.Equals(userId));

            return Result;
        }

        [HttpGet]
        [Route("[controller]/user-saving/{savingId:int}")]
        public ApplicationUser? GetUserBySavingId(int savingId)
        {
            return _Savings.GetUserBySavingsId(savingId);
        }

        [HttpGet]
        [Route("[controller]/group-members/{groupId:int}")]
        public IEnumerable<GroupMember> GetMembersByGroup(int groupId)
        {
            return _GroupMember.GetMembersByGroupId(groupId);
        }

        [HttpGet]
        [Route("[controller]/group-admin/{groupId:int}")]
        public ApplicationUser? GetGroupAdminByGroupId(int groupId)
        {
            return _GroupMember.GetGroupAdminByGroupId(groupId);
        }

        #endregion

        #region Updating/Removing User's Data
        [HttpPatch]
        [Route("[controller]/update-profile/{userId:guid}")]
        public async Task<ActionResult> UpdateProfile(string userId)
        {
            var User = await _UserManager.FindByIdAsync(userId);

            if (User == null)
            {
                return NotFound();
            }

            User.FirstName = Request.Form["FirstName"].ToString();
            User.LastName = Request.Form["LastName"].ToString();
            User.Gender = Request.Form["Gender"].ToString();
            User.NumberType = Request.Form["NumberType"].ToString();
            User.ContactNumber = Request.Form["ContactNumber"].ToString();
            User.AddressStreet = Request.Form["AddressStreet"].ToString();
            User.AddressBarangay = Request.Form["AddressBarangay"].ToString();
            User.AddressProvince = Request.Form["AddressProvince"].ToString();
            User.AddressCity = Request.Form["AddressCity"].ToString();

            await _UserManager.UpdateAsync(User);
            _Logger.LogInformation($"User {User.FirstName} details has been updated.");

            AddActivity($"Updated profile details");

            return Ok(User);
        }

        [HttpPatch]
        [Route("[controller]/update-status/{userId:guid}")]
        public async Task<ActionResult> UpdateStatus(string userId)
        {
            var User = await _UserManager.FindByIdAsync(userId);

            if (User == null)
            {
                return NotFound();
            }

            User.IsActive = Boolean.Parse(Request.Form["IsActive"].ToString());            
            await _UserManager.UpdateAsync(User);
            _Logger.LogInformation($"User {User.FirstName} status has been updated to {User.IsActive}.");

            AddActivity($"Updated profile picture status");

            return Ok(User);
        }

        [HttpPost]
        [Route("[controller]/upload/profile-picture/{userId:guid}")]
        public async Task<ActionResult> SaveProfilePicture(string userId)
        {
            var User = await _UserManager.FindByIdAsync(userId);
            if(User == null)
            {
                return NotFound();
            }

            var File = Request.Form.Files.GetFile("ProfilePicture");
            var Extension = Path.GetExtension(File.FileName);
            var Filename = $"{userId}{Extension}";
            var FileUrl = $"/uploads/{Filename}";


            var filePath = Path.Combine(_UploadsFolder + "profile-pics/", Filename);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await File.CopyToAsync(stream).ConfigureAwait(false);
            }

            User.ProfilePicURL = FileUrl;

            var result = await _UserManager.UpdateAsync(User);
            _Logger.LogInformation($"User {User.FirstName} profile pic has been updated.");

            AddActivity($"Updated profile picture");

            return Ok(User);
        }
        #endregion

        public ActivityLog AddActivity(string message)
        {
            Random Random = new Random();
            int NewActivityId = Random.Next(0, 1000);
            var Activity = _ActivityLog.GetActivityById(NewActivityId);

            while (Activity != null)
            {
                NewActivityId = Random.Next(0, 1000);
                Activity = _ActivityLog.GetActivityById(NewActivityId);
            }

            Activity = new ActivityLog()
            {
                Id = NewActivityId,
                UserId = Request.Form["UserId"].ToString(),
                Message = message,
                DateAccess = DateTime.Now
            };

            _ActivityLog.AddActivity(Activity);
            _Logger.LogInformation($"Activity with ID {NewActivityId} has been listed.");

            return Activity;
        }
    }
}
