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
    [Controller]
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
        public IEnumerable<GroupMember> GetMembersByGroupId(int id)
        {
            var Members = _GroupMember.GetMembersByGroupId(id);

            return Members;
        }

        [HttpGet]
        [Route("[controller]/user/{userId:guid}")]
        public IEnumerable<GroupDetails> GetGroupsByUserId(string userId)
        {
            var Groups = _GroupMember.GetGroupsByUserId(userId);

            return Groups;
        }

        [HttpGet]
        [Route("[controller]/admin/{userId:guid}")]
        public IEnumerable<GroupDetails> GetGroupsByCreator(string userId)
        {
            var Groups = _GroupDetails.GetGroupsByAdmin(userId);

            return Groups;
        }

        [HttpGet]
        [Route("[controller]/savings/{groupId:int}")]
        public GroupSaving GetGroupSaving(int groupId) 
        {
            var Result = _GroupSavings.GetGroupSavingsBySavingsId(groupId);
            return Result;
        }

        [HttpGet]
        [Route("[controller]/saving/{savingId:int}")]
        public GroupDetails GetGroupBySavingsId(int savingId)
        {
            var Result = _GroupSavings.GetGroupBySavingsId(savingId);
            return Result;
        }
        #endregion

        #region Create Data for Group Savings

        [HttpPost]
        [Route("[controller]/create")]
        public IActionResult CreateGroup()
        {
            DateTime currentDate = DateTime.Now;
            var Group = new GroupDetails()
            {
                GroupName = Request.Form["GroupName"].ToString(),
                GroupDescription = Request.Form["GroupDescription"].ToString(),
                GroupCreator = Request.Form["GroupCreator"].ToString(),
                DateCreated = currentDate,
                IsActive = Boolean.Parse(Request.Form["IsActive"].ToString())
            };

            _GroupDetails.AddGroup(Group);
            _Logger.LogInformation($"New group has been listed.");

            AddActivity($"New group has been listed.");

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

            var Members = _GroupMember.GetMembersByGroupId(Group.Id);

            foreach (var User in Members)
            {
                if (User.Id.Equals(Request.Form["UserId"].ToString()))
                    return NotFound("Already a member.");
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

            #region Create new savings under a group
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
            _Logger.LogInformation($"Savings with ID has been listed.");
            #endregion

            var savings = _Savings.GetAllSavings();
            var latestSaving = savings.OrderByDescending(save => save.Id).FirstOrDefault();

            #region Create new group savings data
            if (latestSaving == null) return NotFound();

            var GroupSaving = new GroupSaving()
            {
                GroupId = groupId,
                SavingsId = latestSaving.Id
            };
            #endregion

            _GroupSavings.AddGroupSaving(GroupSaving);
            _Logger.LogInformation($"New group savings has been listed.");

            AddActivity($"Added new group savings.");

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
            Group.IsActive = Boolean.Parse(Request.Form["IsActive"].ToString());

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

        [HttpPatch]
        [Route("[controller]/update-saving/{savingId:int}")]
        public IActionResult UpdateGroupSavings(int savingId)
        {
            int groupId = Convert.ToInt32(Request.Form["GroupId"].ToString());
            var group = _GroupDetails.GetGroupDetailById(groupId);
            var Saving = _Savings.GetSavingsById(savingId);
            if (Saving == null || group == null)
            {
                return NotFound();
            }

            #region Create new savings under a group

            DateTime currentDate = DateTime.Now;

            Saving.DateUpdated = currentDate;
            Saving.UserUpdated = Request.Form["UserId"].ToString();
            Saving.Amount = decimal.Parse(Request.Form["Amount"].ToString());
            Saving.Description = Request.Form["Description"].ToString();
            Saving.IsActive = Boolean.Parse(Request.Form["IsActive"].ToString());

            _Savings.UpdateSavings(Saving);

            _Logger.LogInformation($"Savings with ID has been listed.");

            #endregion

            #region Create new group savings data

            var GroupSaving = _GroupSavings.GetGroupSavingsBySavingsId(savingId);

            if(GroupSaving == null)
            {
                GroupSaving = new GroupSaving()
                {
                    GroupId = groupId,
                    SavingsId = Saving.Id
                };
                _GroupSavings.AddGroupSaving(GroupSaving);
            }
            else
            {
                GroupSaving.GroupId = groupId;
                GroupSaving.SavingsId = Saving.Id;

                _GroupSavings.UpdateGroupSaving(GroupSaving);
            }
            

            #endregion

            _Logger.LogInformation($"You updated a group savings.");

            AddActivity($"Added new group savings.");

            return Ok(GroupSaving);
        }

        #endregion

        public ActivityLog AddActivity(string message)
        {
            var Activity = new ActivityLog()
            {
                UserId = Request.Form["UserId"].ToString(),
                Message = message,
                DateAccess = DateTime.Now
            };

            _ActivityLog.AddActivity(Activity);
            _Logger.LogInformation($"Updated the group details.");

            return Activity;
        }
    }
}
