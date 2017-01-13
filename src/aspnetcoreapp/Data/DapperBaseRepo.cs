using Microsoft.Data.Sqlite;
using System.Data;
using Microsoft.AspNetCore.Hosting;

namespace WebApplication.Data
	{
		public class DapperBaseRepo
		{
			private readonly IHostingEnvironment _hostingEnvironment;

			public DapperBaseRepo (IHostingEnvironment hostingEnvironment)
			{
				_hostingEnvironment = hostingEnvironment;
			}
			public string DbFile
			{
				get { return _hostingEnvironment.ContentRootPath + "/ImportDb.sqlite"; }
			}

			public IDbConnection SimpleDbConnection()
			{
				return new SqliteConnection("Data Source=" + DbFile);
			}
		}
	}


