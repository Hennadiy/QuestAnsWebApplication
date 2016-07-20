using System.Web.Optimization;
using System.Web.Optimization.React;

namespace QuestAnsWebApplication.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new BabelBundle("~/bundles/main")
                .IncludeDirectory("~/jsScripts/", "*.js", false)

                .IncludeDirectory("~/jsScripts/dispatcher", "*.js", true)
                .IncludeDirectory("~/jsScripts/constants", "*.js", true)
                .IncludeDirectory("~/jsScripts/actions", "*.js", true)
                .IncludeDirectory("~/jsScripts/stores", "*.js", true)

                .IncludeDirectory("~/reactScripts/components", "*.jsx", true)
                .IncludeDirectory("~/reactScripts/forms", "*.jsx", true)
                .IncludeDirectory("~/reactScripts/navigation", "*.jsx", true)
                .IncludeDirectory("~/reactScripts/pages", "*.jsx", true)

                .IncludeDirectory("~/reactScripts/", "*.jsx", false)
                );

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/scripts/events.js",
                "~/scripts/flux/flux.js",
                "~/scripts/react/react.js",
                "~/scripts/react/react-dom.js",
                "~/scripts/react/react-with-addons.js",
                "~/scripts/react/ReactRouter.js",
                "~/Scripts/jquery-2.2.4.min.js",
                "~/scripts/spin.js",
                "~/Scripts/toastr.min.js",
                "~/Scripts/bootstrap.min.js"
                ));

            bundles.Add(new StyleBundle("~/content/css").Include(
                "~/Content/bootstrap.min.css",
                "~/Content/toastr.css",
                "~/Content/Site.css"
                ));
        }
    }
}