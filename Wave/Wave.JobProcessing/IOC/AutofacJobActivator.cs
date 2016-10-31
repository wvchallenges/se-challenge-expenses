using Autofac;
using Microsoft.Azure.WebJobs.Host;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wave.JobProcessing.IOC
{
    /// <summary>
    /// The Autofac Activator
    /// </summary>
    class AutofacJobActivator : IJobActivator
    {
        /// <summary>
        /// The container
        /// </summary>
        private readonly IContainer container;

        /// <summary>
        /// Initializes a new instance of the <see cref="AutofacJobActivator"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public AutofacJobActivator(IContainer container)
        {
            this.container = container;
        }

        /// <summary>
        /// Creates a new instance of a job type.
        /// </summary>
        /// <typeparam name="T">The job type.</typeparam>
        /// <returns>
        /// A new instance of the job type.
        /// </returns>
        public T CreateInstance<T>()
        {
            return this.container.Resolve<T>();
        }
    }
}
