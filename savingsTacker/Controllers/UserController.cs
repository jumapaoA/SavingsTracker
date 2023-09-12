using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using savingsTacker.Data;
using savingsTacker.Data.Repositories.DbRepositories;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Controllers
{
    [ApiController]
    [Authorize]
    public class UserController
    {
        private readonly ApplicationDbContext _DbContext;
        private readonly IGroupMembersRepository _GroupMember;
        private readonly ISavingsRepository _Savings;

        public UserController(ApplicationDbContext dbContext, IGroupMembersRepository groupMembers, SavingsRepository savings)
        {
            _DbContext = dbContext;
            _GroupMember = groupMembers;
            _Savings = savings;
        }

        #region Getters that Returns an ApplicationUser Type

        [HttpGet]
        [Route("api/[controller]/")]
        public IEnumerable<ApplicationUser> GetAllUser()
        {
            return _DbContext.Users;
        }

        [HttpGet]
        [Route("api/[controller]/{userId:guid}")]
        public ApplicationUser GetUserById(string userId)
        {
            var Result = _DbContext.Users.ToList().FirstOrDefault(User => User.Id == userId);

            return Result;
        }

        [HttpGet]
        [Route("api/[controller]/userSaving/{savingId:int}")]
        public ApplicationUser? GetUserBySavingId(int savingId)
        {
            return _Savings.GetUserBySavingsId(savingId);
        }

        [HttpGet]
        [Route("api/[controller]/groupMembers/{groupId:int}")]
        public IEnumerable<ApplicationUser> GetMembersByGroup(int groupId)
        {
            return _GroupMember.GetMembersByGroupId(groupId);
        }

        [HttpGet]
        [Route("api/[controller]/groupAdmin/{groupId:int}")]
        public ApplicationUser? GetGroupAdminByGroupId(int groupId)
        {
            return _GroupMember.GetGroupAdminByGroupId(groupId);
        }

        #endregion

    }
}
