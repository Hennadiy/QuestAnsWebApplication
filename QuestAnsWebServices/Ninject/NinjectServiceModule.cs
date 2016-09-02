using Microsoft.Owin.Security;
using Ninject.Modules;
using Ninject.Web.Common;
using QuestAnsWebServices.App_Start;
using QuestAnsWebServices.DbExtensions;
using QuestAnsWebServices.Helpers;
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
            Kernel.Bind<ICityRepository>().To<CityRepository>();
            Kernel.Bind<ICountryRepository>().To<CountryRepository>();

            Kernel.Bind<IApplicationDbInitializer>().To<ApplicationDbInitializer>();
            Kernel.Bind<IJsonHelper>().To<JsonHelper>();

            Kernel.Bind<ApplicationDbContext>().ToSelf().InSingletonScope();
        }
    }
}