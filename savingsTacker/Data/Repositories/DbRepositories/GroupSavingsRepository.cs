using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.DbRepositories
{
    public class GroupSavingsRepository : IGroupSavingsRepository
    {
        //instance variable
        ApplicationDbContext _DbContext;

        public GroupSavingsRepository(ApplicationDbContext dbContext)
        {
            _DbContext = dbContext;
        }

        public IEnumerable<Saving> GetSavingsByGroupId(int groupId)
        {
            var groups = _DbContext.Set<GroupSaving>().Where(group => group.GroupId == groupId);

            IEnumerable<Saving> Savings = new List<Saving>();

            foreach (var group in groups)
            {
                var Result = _DbContext.Set<Saving>().FirstOrDefault(saving => saving.Id == group.SavingsId);
                Savings.Append(Result);
            }

            return Savings;
        }

        public IEnumerable<Saving> GetAllGroupSavingsByUserId(string userId)
        {
            var GroupsBelonged = _DbContext.Set<GroupMember>().Where(member => member.UserId == userId);
            IEnumerable<Saving> SavingsInGroup = new List<Saving>();

            foreach (var GroupMember in GroupsBelonged)
            {
                var GroupSaving = _DbContext.Set<GroupSaving>().Where(Group => Group.GroupId == GroupMember.GroupId);

                foreach (var GroupSave in GroupSaving)
                {
                    var Result = _DbContext.Set<Saving>().FirstOrDefault(Save => Save.Id == GroupSave.SavingsId);
                    SavingsInGroup.Append(Result);
                }
            }

            return SavingsInGroup;
        }

        public GroupSaving? GetGroupSavingsById(int groupSavingId)
        {
            return _DbContext.Set<GroupSaving>().FirstOrDefault(saving => saving.Id == groupSavingId);
        }

        public void AddGroupSaving(GroupSaving groupSaving, Saving saving)
        {
            _DbContext.Set<GroupSaving>().Add(groupSaving);
            _DbContext.Set<Saving>().Add(saving);
        }

        public void UpdateGroupSaving(GroupSaving groupSaving, Saving saving)
        {
            _DbContext.Set<GroupSaving>().Update(groupSaving);
            _DbContext.Set<Saving>().Update(saving);
        }

        public void DeleteGroupSaving(int groupId)
        {
            _DbContext.Set<GroupSaving>().Remove(GetGroupSavingsById(groupId));
        }

        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
