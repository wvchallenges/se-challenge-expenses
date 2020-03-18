using System;
using System.Web.Http;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Hosting;
using Owin;

namespace WaveChallenge
{
    internal class Program
    {
        private const string BaseAddress = "http://localhost:50231/";

        private static void Main()
        {
            IDisposable server = null;

            try
            {
                server = WebApp.Start<Program>(BaseAddress);

                // Set up server configuration
                Console.WriteLine("Listening on " + BaseAddress);
                Console.WriteLine("Hit ENTER to exit...");
                Console.ReadLine();
            }
            catch (Exception e)
            {
                Console.WriteLine("Could not start server: {0}", e.GetBaseException().Message);
                Console.WriteLine("Hit ENTER to exit...");
                Console.ReadLine();
            }
            finally
            {
                if (server != null)
                {
                    // Stop listening
                    server.Dispose();
                }
            }
        }

        public void Configuration(IAppBuilder appBuilder)
        {
            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute("DefaultApi", "api/{action}", new {controller = "FileUpload"});

            appBuilder.UseCors(CorsOptions.AllowAll);
            appBuilder.UseWebApi(config);
        }
    }
}