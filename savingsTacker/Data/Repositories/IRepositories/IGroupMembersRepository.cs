using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IGroupMembersRepository
    {
        IEnumerable<ApplicationUser> GetMembersByGroupId(int grouId);
        IEnumerable<GroupMember> GetGroupsByUserId(string userId);
        ApplicationUser? GetGroupAdminByGroupId(int groupId);
        void AddGroupMember(GroupMember member);
        void UpdateGroupMember(GroupMember member);
        void DeleteGroupMember(GroupMember member);
        void Save();
    }
}
