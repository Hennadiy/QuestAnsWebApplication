using System;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using QuestAnsWebServices.App_Start;
using QuestAnsWebServices.Providers;

[assembly: OwinStartup(typeof(QuestAnsWebServices.Startup))]

namespace QuestAnsWebServices
{
    public class Startup
    {
        public static string PublicClientId = "self";

        public void Configuration(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request 
            /* need latest version but there is a bug with owin so used 3.2.0
            app.UseNinjectMiddleware(NinjectWebCommon.GetKernel);
            app.UseNinjectWebApi(GlobalConfiguration.Configuration);
            */
            app.CreatePerOwinContext(UserDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user 
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider 
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            var OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new UserOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/login"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(365),
                // Note: Remove the following line before you deploy to production:
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);
        }
    }
}
