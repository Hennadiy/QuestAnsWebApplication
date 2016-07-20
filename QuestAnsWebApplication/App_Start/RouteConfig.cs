using System.Web.Mvc;
using System.Web.Routing;

namespace QuestAnsWebApplication
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Home",
                "{*reactRoute}",
                new { controller = "Home", action = "Index", reactRoute = UrlParameter.Optional }
            );
        }
    }
}
