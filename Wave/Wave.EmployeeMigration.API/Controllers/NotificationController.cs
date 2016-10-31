using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Wave.EmployeeMigration.API.Hubs;

namespace Wave.EmployeeMigration.API.Controllers
{
    
    public class NotificationController : ApiController
    {
        [HttpGet]
        [ActionName("NotifyHub")]
        public void NotifyHub(string connectionId, string message)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
            hub.Clients.All.updateuploadstatus(message);
        }
    }
}
