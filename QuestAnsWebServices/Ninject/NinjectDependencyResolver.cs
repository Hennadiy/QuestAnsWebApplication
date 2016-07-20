using System;
using System.Diagnostics.Contracts;
using System.Web.Http.Dependencies;
using Ninject;

namespace QuestAnsWebServices.Ninject
{
    public class NinjectDependencyResolver : NinjectDependencyScope, IDependencyResolver
    {
        private readonly IKernel _kernel;

        public NinjectDependencyResolver(IKernel kernel)
            : base(kernel)
        {
            Contract.Requires<ArgumentNullException>(kernel != null);

            _kernel = kernel;
        }

        public IDependencyScope BeginScope()
        {
            return new NinjectDependencyScope(_kernel.BeginBlock());
        }
    }
}