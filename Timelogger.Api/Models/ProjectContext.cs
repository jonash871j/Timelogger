using Microsoft.EntityFrameworkCore;
using Timelogger.Models.Entities;


namespace Timelogger.Models
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) 
            : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
    }
}
