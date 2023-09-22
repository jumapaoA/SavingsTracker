using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.DbRepositories
{
    public class GroupDetailsRepository : IGroupDetailsRepository
    {
        //instance variables
        private ApplicationDbContext _DbContext;

        public GroupDetailsRepository(ApplicationDbContext DbContext)
        {
            _DbContext = DbContext;
        }

        public IEnumerable<GroupDetails> GetAllGroups()
        {
            return _DbContext.Set<GroupDetails>().ToList();
        }

        public IEnumerable<GroupDetails> GetGroupsByAdmin(string userId)
        {
            return _DbContext.Set<GroupDetails>().Where(group => group.GroupCreator.Equals(userId));
        }

        public GroupDetails? GetGroupDetailById(int Id)
        {
            return _DbContext.Set<GroupDetails>().FirstOrDefault(group => group.Id == Id);
        }

        public void AddGroup(GroupDetails group)
        {
            _DbContext.Set<GroupDetails>().Add(group);
            Save();
        }

        public void UpdateGroupDetails(GroupDetails group)
        {
            _DbContext.Set<GroupDetails>().Update(group);
            Save();
        }

        public void DeleteGroup(int groupId)
        {
            _DbContext.Set<GroupDetails>().Remove(GetGroupDetailById(groupId));
            Save();
        }

        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
