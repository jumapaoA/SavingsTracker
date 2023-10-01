using savingsTacker.Models;

namespace savingsTacker.Data.Repositories.IRepositories
{
    public interface ITokensRepository
    {
        IEnumerable<Tokens> GetAllTokens();
        Tokens? GetTokenByToken(string token);
        void AddToken(Tokens token);
        void Save();
    }
}
