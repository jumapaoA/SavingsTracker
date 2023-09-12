using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface ISavingsRepository
    {
        IEnumerable<Saving> GetAllSavings();
        IEnumerable<Saving> GetSavingsByUserId(string userId);
        Saving? GetSavingsById(int savingsId);
        ApplicationUser? GetUserBySavingsId(int savingsId);
        void AddSaving(Saving saving);
        void UpdateSavings(Saving saving);
        void DeleteSavings(int savingsId);
        void Save();
    }
}
