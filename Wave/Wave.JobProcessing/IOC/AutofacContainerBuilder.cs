using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Wave.Employee.BusinessLogic;
using Wave.Employee.BusinessLogic.Interfaces;

namespace Wave.JobProcessing.IOC
{
    /// <summary>
    /// The AUTOFAC Container builder
    /// </summary>
    public static class AutofacContainerBuilder
    {
        private static IContainer Container { get; set; }
        
        public static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            RegisterBusinessLogic(builder);
            RegisterJobs(builder);

            // build container 
            return Container = builder.Build();
        }

        private static void RegisterBusinessLogic(ContainerBuilder builder)
        {
            builder.Register(c => new FileProcessingLogic()).As<IFileProcessingLogic>();
        }

        private static void RegisterJobs(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).Where(t => t.Name.EndsWith("Job"));
        }

        private static Assembly[] GetAllAssemblies(string assemblyNamePrefix)
        {
            return AppDomain.CurrentDomain.GetAssemblies().Where(a => a.FullName.StartsWith(assemblyNamePrefix)).ToArray();
        }
    }
}
