using QuestAnsWebServices.Providers;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace QuestAnsWebServices
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AutoMapperConfig.Register();
            DbExtension.Initialize<ApplicationDbContext>(false);
            GlobalConfiguration.Configure(WebApiConfig.Register);
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
