using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;
using Wave.Data;
using Wave.Models;

namespace Wave.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UploadController : ApiController
    {
        [HttpPost]
        public async Task<HttpResponseMessage> Post()
        {
            string path = Path.GetTempPath();
            var provider = new MultipartFileStreamProvider(path);                       

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);                               
                
                try
                {
                    var file = provider.FileData.FirstOrDefault(); //Single MultiPartFile

                    var waveInfoz = new List<WaveInfo>();
                    using (var stream = File.OpenText(file.LocalFileName))
                    {
                        var header = await stream.ReadLineAsync();
                        var columnNames = Helper.PreProcessHeader(header);

                        var props = typeof(WaveInfo).GetProperties();
                        while (!stream.EndOfStream)
                        {
                            var viRow = new WaveInfo() { id = Guid.NewGuid() };

                            var line = await stream.ReadLineAsync();
                            var values = Helper.PreProcessLine(line);

                            for (int col = 0; col < columnNames.Length; col++)
                            {
                                var columnName = columnNames[col];
                                var value = values[col];

                                var prop = props.FirstOrDefault(p => p.Name == columnName);
                                try
                                {
                                    if (prop.PropertyType == typeof(DateTime))
                                        prop.SetValue(viRow, Helper.PreProcessDateTime(value));
                                    else if (prop.PropertyType == typeof(Decimal))
                                        prop.SetValue(viRow, Helper.PreProcessDecimal(value));
                                    else
                                        prop.SetValue(viRow, value);
                                }
                                catch
                                {
                                    //Log Field Error and continue
                                }
                            }

                            waveInfoz.Add(viRow);                                
                        }
                    }

                    using (var ds = new DataService()) {
                        await ds.Update(waveInfoz);
                    }
                }
                catch
                {
                    //Log Row Error and continue                        
                }
                                
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                //Fatal Error
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpGet]
        public IEnumerable<WaveInfo> Get()
        {
            using (var ds = new DataService()) {
                return ds.GetData();
            }
        }
    }
}
