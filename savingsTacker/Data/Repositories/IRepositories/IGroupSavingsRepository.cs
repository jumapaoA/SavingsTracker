using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IGroupSavingsRepository
    {
        IEnumerable<Saving> GetSavingsByGroupId(int groupId);
        IEnumerable<Saving> GetAllGroupSavingsByUserId(string userId);
        GroupSaving? GetGroupSavingsBySavingsId(int savingId);
        GroupDetails? GetGroupBySavingsId(int groupSavingId);
        void AddGroupSaving(GroupSaving groupSaving);
        void UpdateGroupSaving(GroupSaving groupSaving);
        void DeleteGroupSaving(int groupId);
        void Save();
    }
}
