using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IActivityLogRepository
    {
        IEnumerable<ActivityLog> GetUserActivity(string userId);
        void AddActivity(ActivityLog activity);
        void Save();
    }
}
