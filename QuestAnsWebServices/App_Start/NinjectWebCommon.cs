[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(QuestAnsWebServices.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(QuestAnsWebServices.App_Start.NinjectWebCommon), "Stop")]

namespace QuestAnsWebServices.App_Start
{
    using System;
    using System.Reflection;
    using System.Web;
    using System.Web.Http;
    using global::Ninject;
    using global::Ninject.Web.Common;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;

    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);

                GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);

                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        private static void RegisterServices(IKernel kernel)
        {
            kernel.Load<NinjectServiceModule>();
        }

        public static StandardKernel GetKernel()
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());
            return kernel;
        }

        public static T Get<T>()
        {
            var kernel = new StandardKernel(new NinjectServiceModule());
            return kernel.Get<T>();
        }
    }
}
