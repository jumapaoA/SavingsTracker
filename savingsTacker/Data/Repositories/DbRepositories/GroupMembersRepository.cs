using AutoMapper.Execution;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.DbRepositories
{
    public class GroupMembersRepository : IGroupMembersRepository
    {
        //instance variables
        private ApplicationDbContext _DbContext;

        public GroupMembersRepository(ApplicationDbContext DbContext)
        {
            _DbContext = DbContext;
        }

        public IEnumerable<ApplicationUser> GetMembersByGroupId(int grouId)
        {
            var ListOfUserId = _DbContext.Set<GroupMember>().Where(group => group.GroupId == grouId);
            IEnumerable<ApplicationUser> members = new List<ApplicationUser>();

            foreach(var member in ListOfUserId) 
            {
                var Result = _DbContext.Set<ApplicationUser>().FirstOrDefault(User => User.Id == member.UserId);
            }

            return members;
        }

        public IEnumerable<GroupDetails> GetGroupsByUserId(string userId)
        {
            var UserGroups = _DbContext.Set<GroupMember>().Where(group => group.UserId == userId);
            var Groups = new List<GroupDetails>();

            foreach(var Group in UserGroups)
            {
                var Result = _DbContext.Set<GroupDetails>().FirstOrDefault(GroupDetail => GroupDetail.Id == Group.GroupId);
            }

            return Groups;
        }

        public ApplicationUser? GetGroupAdminByGroupId(int groupId)
        {
            var groupAdmin = _DbContext.Set<GroupMember>()
                .FirstOrDefault(group => group.GroupId == groupId && group.IsAdmin == true );

            return _DbContext.Set<ApplicationUser>().FirstOrDefault(user=> user.Id == groupAdmin.UserId);
        }

        public GroupMember? GetMemberById(int groupMember)
        {
            return _DbContext.Set<GroupMember>().FirstOrDefault(Member => Member.Id  == groupMember);
        }

        public void AddGroupMember(GroupMember member)
        {
            _DbContext.Set<GroupMember>().Add(member);
            Save();
        }

        public void UpdateGroupMember(GroupMember member)
        {
            _DbContext.Set<GroupMember>().Update(member);
            Save();
        }

        public void DeleteGroupMember(GroupMember member)
        {
            _DbContext.Set<GroupMember>().Update(member);
            Save();
        }

        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
