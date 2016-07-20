using System.Security.Principal;
using Microsoft.Owin.Security;
using Ninject.Modules;
using Ninject.Web.Common;
using QuestAnsWebServices.App_Start;
using QuestAnsWebServices.Providers;
using QuestAnsWebServices.Repositories;

namespace QuestAnsWebServices.Ninject
{
    public class NinjectServiceModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind<ApplicationUserManager>().ToMethod(MotherObject.GetUserManager).InRequestScope();
            Kernel.Bind<IAuthenticationManager>().ToMethod(MotherObject.GetAuthenticationManager).InRequestScope();

            Kernel.Bind<IUserRepository>().To<UserRepository>();

            Kernel.Bind<ApplicationDbContext>().ToSelf();
        }
    }
}