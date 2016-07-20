using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Ninject.Activation;
using QuestAnsWebServices.App_Start;

namespace QuestAnsWebServices.Ninject
{
    public static class MotherObject
    {
        public static IAuthenticationManager GetAuthenticationManager(IContext context)
        {
            return HttpContext.Current.GetOwinContext().Authentication;
        }

        public static ApplicationUserManager GetUserManager(IContext context)
        {
            return HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        }
    }
}