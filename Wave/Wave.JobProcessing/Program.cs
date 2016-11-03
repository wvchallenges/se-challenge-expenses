using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.ServiceBus;
using Wave.JobProcessing.IOC;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.WebJobs.ServiceBus;
using Microsoft.ServiceBus.Messaging;
using System.IO;
using System.Configuration;

namespace Wave.JobProcessing
{
    // To learn more about Microsoft Azure WebJobs SDK, please see http://go.microsoft.com/fwlink/?LinkID=320976
    class Program
    {
        private static string _servicesBusConnectionString;
        private static NamespaceManager _namespaceManager;

        // Please set the following connection strings in app.config for this WebJob to run:
        // AzureWebJobsDashboard and AzureWebJobsStorage
        static void Main()
        {
            _servicesBusConnectionString = AmbientConnectionStringProvider.Instance.GetConnectionString(ConnectionStringNames.ServiceBus);
            _namespaceManager = NamespaceManager.CreateFromConnectionString(_servicesBusConnectionString);
            InitializeQueue();

            JobHostConfiguration configuration = new JobHostConfiguration
            {
                DashboardConnectionString = "",
                StorageConnectionString = AmbientConnectionStringProvider.Instance.GetConnectionString(ConnectionStringNames.Storage)
            };
            //configuration.StorageConnectionString = ConfigurationManager.ConnectionStrings[""]

            ServiceBusConfiguration serviceBusConfig = new ServiceBusConfiguration
            {
                ConnectionString = _servicesBusConnectionString
            };

            configuration.UseServiceBus(serviceBusConfig);
            configuration.JobActivator = new AutofacJobActivator(AutofacContainerBuilder.BuildContainer());

            var host = new JobHost(configuration);
            // The following code ensures that the WebJob will be running continuously
            host.RunAndBlock();
        }

        private static void InitializeQueue()
        {
            if (!_namespaceManager.QueueExists(Constants.ExpenseQueue))
            {
                _namespaceManager.CreateQueue(Constants.ExpenseQueue);
            }
        }
    }
}
