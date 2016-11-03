using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using Wave.Employee.BusinessLogic;
using Wave.Employee.BusinessLogic.BusinessModels;
using Wave.Employee.BusinessLogic.Interfaces;
using Wave.EmployeeMigration.API.Hubs;

namespace Wave.EmployeeMigration.API.Controllers
{
    ////[EnableCors(origins: "http://waveemployeemigration.azurewebsites.net/", headers: "*", methods: "*")]
    public class UploadController : ApiController
    {
        private readonly IPreProcessingLogic _preProcessingLogic;
        private readonly IFileValidator _fileValidator;
        //private readonly IHubContext Hub;
        private readonly string _connectionId;

        public UploadController() { }
        public UploadController(IPreProcessingLogic preprocessingLogic, IFileValidator fileValidator)
        {
            _preProcessingLogic = preprocessingLogic;
            _fileValidator = fileValidator;
        }

        

        [HttpPost]
        [ActionName("UploadFiles")]
        public async Task<HttpResponseMessage> UploadFiles(string connectionId)
        {
            var provider = new MultipartMemoryStreamProvider();
            try
            {
                // Read the form data.
                UpdateStatusToClient(connectionId, (int)Status.UploadInProgress);
                await Request.Content.ReadAsMultipartAsync(provider);
                UpdateStatusToClient(connectionId, (int)Status.UploadSuccessfull);
                if (provider.Contents != null && provider.Contents.Count > 0)
                {
                    UpdateStatusToClient(connectionId, (int)Status.ValidationInProgress);
                    if (_fileValidator.IsFileValid(provider.Contents[0].Headers))
                    {
                        UpdateStatusToClient(connectionId, (int)Status.ValidationSuccessfull);
                        byte[] file = await provider.Contents[0].ReadAsByteArrayAsync();
                        
                        System.Text.UTF8Encoding enc = new System.Text.UTF8Encoding();
                        string str = enc.GetString(file);
                        await _preProcessingLogic.ProcessFileContentWithServiceBus(str, connectionId);
                        UpdateStatusToClient(connectionId, (int)Status.SentForProcessing);
                        return Request.CreateResponse(HttpStatusCode.OK, true);
                    }
                    else
                    {
                        UpdateStatusToClient(connectionId, (int)Status.ValidationFailed);
                    }
                }
                else
                {
                    UpdateStatusToClient(connectionId, (int)Status.UploadFailed);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest,"Bad Request");
            }
            catch (System.Exception e)
            {
                UpdateStatusToClient(connectionId, (int)Status.Aborted);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }


        [HttpGet]
        [ActionName("Test")]
        public string Test()
        {
            return "Hello!";
        }

        [HttpGet]
        [ActionName("UpdateStatus")]
        public void UpdateStatus(string connectionId, int status)
        {
            UpdateStatusToClient(connectionId, status);
        }


        [HttpPost]
        [ActionName("UpdateResult")]
        public void UpdateResult(string connectionId, [FromBody]List<MonthlyExpense> result)
        {
            UpdateUploadResultToClient(connectionId, result);
        }

        [HttpGet]
        [ActionName("UpdateMigrationProgress")]
        public void UpdateMigrationProgress(string connectionid, int completed)
        {
            UpdateMigrationProgressToClient(connectionid, completed);
        }

        public void UpdateStatusToClient(string connectionId, int message)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
            hub.Clients.Client(connectionId).updateuploadstatus(message);
        }

        public void UpdateUploadResultToClient(string connectionId, List<MonthlyExpense> result)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
            hub.Clients.All.receiveUploadResult(result);
        }

        public void UpdateMigrationProgressToClient(string connectionId, int completed)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
            hub.Clients.All.updateMigrationProgress(completed);
        }
    }
}
