using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IGroupMembersRepository
    {
        IEnumerable<GroupMember> GetMembersByGroupId(int grouId);
        IEnumerable<GroupDetails> GetGroupsByUserId(string userId);
        ApplicationUser? GetGroupAdminByGroupId(int groupId);
        GroupMember? GetMemberById(int groupMember);
        void AddGroupMember(GroupMember member);
        void UpdateGroupMember(GroupMember member);
        void DeleteGroupMember(GroupMember member);
        void Save();
    }
}
