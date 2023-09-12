using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IGroupSavingsRepository
    {
        IEnumerable<Saving> GetSavingsByGroupId(int groupId);
        IEnumerable<Saving> GetAllGroupSavingsByUserId(string userId);
        GroupSaving? GetGroupSavingsById(int groupSavingId);
        void AddGroupSaving(GroupSaving groupSaving, Saving saving);
        void UpdateGroupSaving(GroupSaving groupSaving, Saving saving);
        void DeleteGroupSaving(int groupId);
        void Save();
    }
}
