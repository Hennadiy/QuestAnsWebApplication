using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using QuestAnsWebServices.EF.User;

namespace QuestAnsWebServices.Extensions
{
    public static class ApplicationUserExtension
    {
        public static async Task<ClaimsIdentity> GenerateUserIdentityAsync(this ApplicationUser user, UserManager<ApplicationUser> manager, string authType)
        {
            var userIdentity = await manager.CreateIdentityAsync(user, authType);
            return userIdentity;
        }
    }
}