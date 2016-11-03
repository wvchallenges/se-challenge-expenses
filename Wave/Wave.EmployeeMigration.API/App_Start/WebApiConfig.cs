using Autofac;
using Autofac.Integration.SignalR;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using Wave.Employee.BusinessLogic;
using Wave.Employee.BusinessLogic.Interfaces;
using Wave.EmployeeMigration.API.Hubs;

namespace Wave.EmployeeMigration.API
{
    public static class WebApiConfig
    {

        public static void Register(HttpConfiguration config)
        {
            //var cors = new EnableCorsAttribute("*", "*", "*");
            //config.EnableCors(cors);
            // Web API configuration and services
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var builder = new ContainerBuilder();
            RegisterBusinessLogic(builder);
            //builder.RegisterHubs(Assembly.GetExecutingAssembly());
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            var container = builder.Build();
            var resolver = new AutofacWebApiDependencyResolver(container);
            //GlobalHost.DependencyResolver = resolver;
            //AddSignalRInjection(container);
            config.DependencyResolver = resolver ;
        }

        private static void RegisterBusinessLogic(ContainerBuilder builder)
        {
            builder.RegisterInstance<IPreProcessingLogic>(new PreProcessingLogic());
            builder.RegisterInstance<IFileValidator>(new FileValidator());
        }
        
    }
}
