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
        }
        public void DeleteGroup(int groupId)
        {
            _DbContext.Set<GroupDetails>().Remove(GetGroupDetailById(groupId));
        }
        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
