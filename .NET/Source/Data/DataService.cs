using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Wave.Models;

namespace Wave.Data
{
    public class WaveDbContext : DbContext
    {
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<WaveInfo>()
                .ToTable("WaveInfo")
                .HasKey(c => c.id)
                .Property(c => c.id);
        }

        public DbSet<WaveInfo> WaveInfoSet { get; set; }
    }

    public class DataService : IDisposable
    {
        public async Task<bool> Update(IEnumerable<WaveInfo> data)
        {
            using (var ctx = new WaveDbContext())
            {
                ctx.WaveInfoSet.RemoveRange(ctx.WaveInfoSet);

                foreach (var wi in data)
                    ctx.WaveInfoSet.Add(wi);

                await ctx.SaveChangesAsync();
            }

            return true;
        }

        public IEnumerable<WaveInfo> GetData()
        {
            using (var ctx = new WaveDbContext())
            {
                return ctx.WaveInfoSet.ToList();
            }
        }

        public void Dispose()
        {            
        }
    }
}