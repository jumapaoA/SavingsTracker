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

        public IEnumerable<GroupMember> GetMembersByGroupId(int grouId)
        {
            var ListOfUsers = _DbContext.Set<GroupMember>().Where(group => group.GroupId == grouId);
            var Members = new List<ApplicationUser>();

            foreach(var member in ListOfUsers) 
            {
                var Result = _DbContext.Set<ApplicationUser>().FirstOrDefault(User => User.Id == member.UserId);
                if(Result != null)
                    Members.Add(Result);
            }

            return ListOfUsers;
        }

        public IEnumerable<GroupDetails> GetGroupsByUserId(string userId)
        {
            var UserGroups = _DbContext.Set<GroupMember>().Where(group => group.UserId.Equals(userId));
            var Groups = new List<GroupDetails>();
            var DestinctGroups = new List<GroupDetails>();

            foreach(var Group in UserGroups)
            {
                var Result = _DbContext.Set<GroupDetails>().FirstOrDefault(GroupDetail => GroupDetail.Id == Group.GroupId);
                if (Result != null)
                    Groups.Add(Result);
            }

            var AllGroups = _DbContext.Set<GroupDetails>().Where(group => group.GroupCreator.Equals(userId));
            Groups.AddRange(AllGroups);
            DestinctGroups.AddRange(Groups.DistinctBy(groups => groups.Id));
            return DestinctGroups;
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
