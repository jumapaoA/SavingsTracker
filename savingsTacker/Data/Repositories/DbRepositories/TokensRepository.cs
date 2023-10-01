using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;
using System.Diagnostics;

namespace savingsTacker.Data.Repositories.DbRepositories
{
    public class TokensRepository : ITokensRepository
    {
        //instance variable
        ApplicationDbContext _DbContext;

        public TokensRepository(ApplicationDbContext context)
        {
            _DbContext = context;
        }

        public void AddToken(Tokens token)
        {
            _DbContext.Set<Tokens>().Add(token);
            Save();
        }

        public IEnumerable<Tokens> GetAllTokens()
        {
            return _DbContext.Set<Tokens>().ToList();
        }

        public Tokens? GetTokenByToken(string token)
        {
            return _DbContext.Set<Tokens>().FirstOrDefault(tok => tok.Token.Equals(token));
        }

        public void Save()
        {
            _DbContext.SaveChanges();
        }
    }
}
