using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WaveChallenge.Infrastructure;
using WaveChallenge.ViewModels;

namespace WaveChallenge.Controllers
{
    public class FileUploadController : ApiController
    {
        private static readonly string ServerUploadFolder = Path.GetTempPath();
        
        [HttpGet]
        public List<ExpenseViewModel> Index()
        {
            return new Db().GetData();
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Upload()
        {
            // Verify that this is an HTML Form file upload request
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.UnsupportedMediaType));
            }

            // Create a stream provider for setting up output streams
            var streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);

            // Read the MIME multipart asynchronously content using the stream provider we just created.
            await Request.Content.ReadAsMultipartAsync(streamProvider);

            ExpenseProcessor.Process(Path.Combine(ServerUploadFolder, streamProvider.FileData[0].LocalFileName));

            var responseMessage = new HttpResponseMessage();
            responseMessage.Headers.Add("Location", Request.Headers.Referrer.AbsoluteUri);
            responseMessage.StatusCode = HttpStatusCode.SeeOther;

            // Create response
            return responseMessage;
        }
    }
}