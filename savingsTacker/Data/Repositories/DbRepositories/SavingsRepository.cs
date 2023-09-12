using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.DbRepositories
{
    public class SavingsRepository : ISavingsRepository
    {
        //instance variables 
        private ApplicationDbContext _DbContext;
        
        public SavingsRepository(ApplicationDbContext DbContext)
        {
            _DbContext = DbContext;
        }

        public IEnumerable<Saving> GetAllSavings()
        {
            return _DbContext.Set<Saving>().ToList();
        }

        public Saving? GetSavingsById(int savingsId)
        {
            return _DbContext.Set<Saving>()
                .FirstOrDefault(Save => Save.Id == savingsId);
        }

        public IEnumerable<Saving> GetSavingsByUserId(string userId)
        {
            return _DbContext.Set<Saving>()
                .Where(saving => saving.UserId == userId);
        }

        public ApplicationUser? GetUserBySavingsId(int savingsId)
        {
            var SavingsContributor = GetSavingsById(savingsId);

            var UserOwner = _DbContext.Users.ToList().FirstOrDefault(User => User.Id == SavingsContributor.UserId);


            return UserOwner;
        }

        public void AddSaving(Saving saving)
        {
            _DbContext.Set<Saving>().Add(saving);
            Save();
        }

        public void DeleteSavings(int savingsId)
        {
            _DbContext.Set<Saving>().Remove(GetSavingsById(savingsId));
            Save();
        }

        public void UpdateSavings(Saving saving)
        {
            _DbContext.Set<Saving>().Update(saving);
        }
        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
