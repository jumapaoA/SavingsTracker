using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Data.Repositories.DbRepositories;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;
using System.Text.RegularExpressions;

namespace savingsTacker.Controllers
{
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly ILogger<GroupDetails> _Logger;
        private readonly ApplicationDbContext _DbContext;
        private readonly IGroupMembersRepository _GroupMember;
        private readonly IGroupDetailsRepository _GroupDetails;
        private readonly IGroupSavingsRepository _GroupSavings;
        private readonly ISavingsRepository _Savings;
        private readonly IActivityLogRepository _ActivityLog;

        public GroupsController(ILogger<GroupDetails> logger, ApplicationDbContext dbContext, IGroupMembersRepository groupMembers, IGroupDetailsRepository groupDetails, IGroupSavingsRepository groupSavings, ISavingsRepository savings, IActivityLogRepository activityLog)
        {
            _Logger = logger;
            _DbContext = dbContext;
            _GroupMember = groupMembers;
            _GroupDetails = groupDetails;
            _GroupSavings = groupSavings;
            _Savings = savings;
            _ActivityLog = activityLog;
        }

        #region Getters for Group Details

        [HttpGet]
        [Route("[controller]")]
        public IEnumerable<GroupDetails> GetAllGroups()
        {
            var Groups = _GroupDetails.GetAllGroups();

            return Groups;
        }

        [HttpGet]
        [Route("[controller]/{id:int}")]
        public GroupDetails GetGroupDetailsByGroupId(int id)
        {
            var Group = _GroupDetails.GetGroupDetailById(id);

            return Group;
        }

        [HttpGet]
        [Route("[controller]/members/{id:int}")]
        public IEnumerable<ApplicationUser> GetMembersByGroupId(int id)
        {
            var Members = _GroupMember.GetMembersByGroupId(id);

            return Members;
        }

        [HttpGet]
        [Route("[controller]/user/{userId:guid}")]
        public IEnumerable<GroupDetails> GetUserById(string userId)
        {
            var Groups = _GroupMember.GetGroupsByUserId(userId);

            return Groups;
        }

        [HttpGet]
        [Route("[controller]/savings/{groupId:int}")]
        public IActionResult GetGroupSaving(int groupId) 
        {
            var Result = _GroupSavings.GetGroupSavingsById(groupId);
            if(Result == null)
            {
                return NotFound();
            }

            return Ok(Result);
        }

        #endregion

        #region Create Data for Group Savings

        [HttpPost]
        [Route("[controller]/create")]
        public IActionResult CreateGroup()
        {
            DateTime currentDate = DateTime.Now;
            Random Random = new Random();
            int NewGroupId = Random.Next(0, 1000);
            var Group = _GroupDetails.GetGroupDetailById(NewGroupId);

            while (Group != null)
            {
                NewGroupId = Random.Next(0, 1000);
                Group = _GroupDetails.GetGroupDetailById(NewGroupId);
            }

            Group = new GroupDetails()
            {
                Id = NewGroupId,
                GroupName = Request.Form["GroupName"].ToString(),
                GroupDescription = Request.Form["GroupDescription"].ToString(),
                DateCreated = currentDate,
                IsActive = true
            };

            _GroupDetails.AddGroup(Group);
            _Logger.LogInformation($"Savings with ID {NewGroupId} has been listed.");

            AddActivity($"Added new group with an ID of {NewGroupId}");

            return Ok(Group);
        }

        [HttpPost]
        [Route("[controller]/add-member/{groupId:int}")]
        public IActionResult AddMember(int groupId)
        {
            var Group = _GroupDetails.GetGroupDetailById(groupId);
            if(Group == null)
            {
                return NotFound();
            }

            DateTime currentDate = DateTime.Now;
            Random Random = new Random();
            int NewMemberId = Random.Next(0, 1000);
            var Member = _GroupMember.GetMemberById(NewMemberId);

            while (Member != null)
            {
                NewMemberId = Random.Next(0, 1000);
                Member = _GroupMember.GetMemberById(NewMemberId);
            }

            Member = new GroupMember()
            {
                Id = NewMemberId,
                GroupId = groupId,
                UserId = Request.Form["UserId"].ToString(),
                IsAdmin = Boolean.Parse(Request.Form["IsAdmin"].ToString()),
                DateAdded = currentDate,
                IsActive = true
            };

            _GroupMember.AddGroupMember(Member);
            _Logger.LogInformation($"Member with ID {NewMemberId} has been listed.");

            AddActivity($"Added new member to the group with an ID of {NewMemberId}");

            return Ok(Member);
        }

        [HttpPost]
        [Route("[controller]/add-saving/{groupId:int}")]
        public IActionResult AddGroupSavings(int groupId)
        {
            var Group = _GroupDetails.GetGroupDetailById(groupId);
            if (Group == null)
            {
                return NotFound();
            }

            Random Random = new Random();

            #region Create new savings under a group
            DateTime currentDate = DateTime.Now;
            int NewSavingsId = Random.Next(0, 1000);
            var Savings = _Savings.GetSavingsById(NewSavingsId);

            while (Savings != null)
            {
                NewSavingsId = Random.Next(0, 1000);
                Savings = _Savings.GetSavingsById(NewSavingsId);
            }

            Savings = new Saving()
            {
                Id = NewSavingsId,
                Amount = decimal.Parse(Request.Form["Amount"].ToString()),
                UserId = Request.Form["UserId"].ToString(),
                DateContributed = currentDate,
                IsActive = true
            };

            _Savings.AddSaving(Savings);
            _Logger.LogInformation($"Savings with ID {NewSavingsId} has been listed.");
            #endregion

            #region Create new group savings data
            int NewGroupSavingId = Random.Next(0, 1000);
            var GroupSaving = _GroupSavings.GetGroupSavingsById(NewGroupSavingId);

            while (GroupSaving != null)
            {
                NewGroupSavingId = Random.Next(0, 1000);
                GroupSaving = _GroupSavings.GetGroupSavingsById(NewGroupSavingId);
            }

            GroupSaving = new GroupSaving()
            {
                Id = NewGroupSavingId,
                GroupId = groupId,
                SavingsId = Convert.ToInt32(Request.Form["UserId"].ToString())
            };
            #endregion

            _GroupSavings.AddGroupSaving(GroupSaving, Savings);
            _Logger.LogInformation($"Member with ID {NewGroupSavingId} has been listed.");

            AddActivity($"Added new group savings with an ID of {NewGroupSavingId}");

            return Ok(GroupSaving);
        }

        #endregion

        #region Updating/Removing User's Data

        [HttpPatch]
        [Route("[controller]/update/{groupId:int}")]
        public IActionResult UpdateGroup(int groupId)
        {
            var Group = _GroupDetails.GetGroupDetailById(groupId);

            if(Group == null)
            {
                return NotFound();
            }

            DateTime currentDate = DateTime.Now;
            Group.GroupName = Request.Form["GroupName"].ToString();
            Group.GroupDescription = Request.Form["GroupDescription"].ToString();
            Group.DateUpdated = currentDate;
            Group.IsActive = true;

            _GroupDetails.UpdateGroupDetails(Group);
            _Logger.LogInformation($"Group with ID {groupId} has been listed.");

            AddActivity($"Updated the group details with an ID of {groupId}");

            return Ok(Group);
        }

        [HttpPatch]
        [Route("[controller]/update-admin/{memberId:int}")]
        public IActionResult UpdateAdminMember(int memberId)
        {
            var Member = _GroupMember.GetMemberById(memberId);
            if (Member == null)
            {
                return NotFound();
            }

            Member.IsAdmin = Boolean.Parse(Request.Form["IsAdmin"].ToString());

            _GroupMember.UpdateGroupMember(Member);
            _Logger.LogInformation($"Member with ID {memberId} has been updated.");

            AddActivity($"Updated the group admin with an ID of {memberId}");

            return Ok(Member);
        }

        [HttpPatch]
        [Route("[controller]/member-status/{memberId:int}")]
        public IActionResult UpdateMemberStatus(int memberId)
        {
            var Member = _GroupMember.GetMemberById(memberId);
            if (Member == null)
            {
                return NotFound();
            }

            Member.DateRemoved = DateTime.Now;
            Member.IsActive = Boolean.Parse(Request.Form["IsActive"].ToString());

            _GroupMember.UpdateGroupMember(Member);
            _Logger.LogInformation($"Member with ID {memberId} has been updated.");

            AddActivity($"Updated the group member status with an ID of {memberId}");

            return Ok(Member);
        }

        //[HttpPatch]
        //[Route("[controller]/update-saving/{groupId:int}")]
        //public IActionResult UpdateGroupSavings(int groupId)
        //{
        //    var Group = _GroupDetails.GetGroupDetailById(groupId);
        //    if (Group == null)
        //    {
        //        return NotFound();
        //    }

        //    Random Random = new Random();

        //    #region Create new savings under a group
        //    DateTime currentDate = DateTime.Now;
        //    int NewSavingsId = Random.Next(0, 1000);
        //    var Savings = _Savings.GetSavingsById(NewSavingsId);

        //    while (Savings != null)
        //    {
        //        NewSavingsId = Random.Next(0, 1000);
        //        Savings = _Savings.GetSavingsById(NewSavingsId);
        //    }

        //    Savings = new Saving()
        //    {
        //        Id = NewSavingsId,
        //        Amount = decimal.Parse(Request.Form["Amount"].ToString()),
        //        UserId = Request.Form["UserId"].ToString(),
        //        DateContributed = currentDate,
        //        IsActive = true
        //    };

        //    _Savings.AddSaving(Savings);
        //    _Logger.LogInformation($"Savings with ID {NewSavingsId} has been listed.");
        //    #endregion

        //    #region Create new group savings data
        //    int NewGroupSavingId = Random.Next(0, 1000);
        //    var GroupSaving = _GroupSavings.GetGroupSavingsById(NewGroupSavingId);

        //    while (GroupSaving != null)
        //    {
        //        NewGroupSavingId = Random.Next(0, 1000);
        //        GroupSaving = _GroupSavings.GetGroupSavingsById(NewGroupSavingId);
        //    }

        //    GroupSaving = new GroupSaving()
        //    {
        //        Id = NewGroupSavingId,
        //        GroupId = groupId,
        //        SavingsId = Convert.ToInt32(Request.Form["UserId"].ToString())
        //    };
        //    #endregion

        //    _GroupSavings.AddGroupSaving(GroupSaving, Savings);
        //    _Logger.LogInformation($"Member with ID {NewGroupSavingId} has been listed.");

        //    return Ok(GroupSaving);
        //}
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
