using Microsoft.AspNet.Identity.EntityFramework;
using QuestAnsWebServices.EF.User;
using System.Data.Entity;

namespace QuestAnsWebServices.Providers
{
    public class UserDbContext : IdentityDbContext<ApplicationUser>
    {
        public UserDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<UserDbContext>());
        }

        public static UserDbContext Create()
        {
            return new UserDbContext();
        }
    }
}
