using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface IActivityLogRepository
    {
        IEnumerable<ActivityLog> GetUserActivity(string userId);
        ActivityLog? GetActivityById(int activityId);
        void AddActivity(ActivityLog activity);
        void Save();
    }
}
