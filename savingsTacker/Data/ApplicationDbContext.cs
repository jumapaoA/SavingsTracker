using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using savingsTacker.Models;

namespace savingsTacker.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Saving> Savings { get; set; }
        public DbSet<GroupDetails> GroupDetails { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }
        public DbSet<GroupSaving> GroupSavings { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
    }
}