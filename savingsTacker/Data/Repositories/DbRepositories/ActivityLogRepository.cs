using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.DbRepositories
{
    public class ActivityLogRepository : IActivityLogRepository
    {
        //instance variable
        ApplicationDbContext _DbContext;

        public ActivityLogRepository(ApplicationDbContext context)
        {
            _DbContext = context;
        }

        public IEnumerable<ActivityLog> GetUserActivity(string userId)
        {
            return _DbContext.Set<ActivityLog>().Where(activity => activity.UserId == userId);
        }

        public ActivityLog? GetActivityById(int activityId)
        {
            return _DbContext.Set<ActivityLog>().FirstOrDefault(activity => activity.Id == activityId);
        }

        public void AddActivity(ActivityLog activity)
        {
            _DbContext.Set<ActivityLog>().Add(activity);
            Save();
        }

        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
