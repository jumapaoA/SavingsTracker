using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IGroupDetailsRepository
    {
        IEnumerable<GroupDetails> GetAllGroups();
        GroupDetails? GetGroupDetailById(int Id);
        void AddGroup(GroupDetails group);
        void UpdateGroupDetails(GroupDetails group);
        void DeleteGroup(int groupId);
        void Save();
    }
}
