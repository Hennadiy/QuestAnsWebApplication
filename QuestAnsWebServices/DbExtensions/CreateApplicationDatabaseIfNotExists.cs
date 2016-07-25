using QuestAnsWebServices.App_Start;
using QuestAnsWebServices.Providers;
using System.Data.Entity;

namespace QuestAnsWebServices.DbExtensions
{
    public class CreateApplicationDatabaseIfNotExists : CreateDatabaseIfNotExists<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            base.Seed(context);

            var applicationDbInitializer = NinjectWebCommon.Get<IApplicationDbInitializer>();

            applicationDbInitializer.Seed(context);
        }
    }
}