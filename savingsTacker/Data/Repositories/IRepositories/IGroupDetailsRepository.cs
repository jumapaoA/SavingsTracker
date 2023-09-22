using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IGroupDetailsRepository
    {
        IEnumerable<GroupDetails> GetAllGroups();
        IEnumerable<GroupDetails> GetGroupsByAdmin(string userId);
        GroupDetails? GetGroupDetailById(int Id);
        void AddGroup(GroupDetails group);
        void UpdateGroupDetails(GroupDetails group);
        void DeleteGroup(int groupId);
        void Save();
    }
}
