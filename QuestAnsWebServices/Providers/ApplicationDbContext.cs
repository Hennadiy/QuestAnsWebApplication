using Microsoft.AspNet.Identity.EntityFramework;
using QuestAnsWebServices.EF.User;

namespace QuestAnsWebServices.Providers
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}
