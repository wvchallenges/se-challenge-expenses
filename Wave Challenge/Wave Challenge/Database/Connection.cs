using Npgsql;
using System;
using System.Configuration;

namespace Wave_Challenge.Database
{
    public class Connection : IDisposable
    {
        public NpgsqlConnection conn { get; set; }

        public Connection()
        {
            conn = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["NpgsqlConnection"].ConnectionString);
        }

        public void Dispose()
        {
            conn.Close();
            conn.Dispose();
        }
    }
}