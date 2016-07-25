using QuestAnsWebServices.Providers;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace QuestAnsWebServices
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AutoMapperConfig.Register();

            //TODO: rewrite in better way

            using (var context = new ApplicationDbContext())
            {
                context.Database.Initialize(false);
            }

            using (var context = new UserDbContext())
            {
                context.Database.Initialize(false);
            }
        }

        protected void Application_BeginRequest()
        {
            if (Request.Headers.AllKeys.Contains("Origin") && Request.HttpMethod == "OPTIONS")
            {
                Response.Flush();
            }
        }
    }
}
