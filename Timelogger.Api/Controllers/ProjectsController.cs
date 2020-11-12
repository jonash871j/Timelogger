using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timelogger.Models;
using Timelogger.Models.Entities;
using Microsoft.Extensions.Configuration;

namespace Timelogger.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        #region AUTO_GENERATED
        private readonly ProjectContext _context;

        public ProjectsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
        #endregion

        /// <summary>
        /// Used to get projects sorted by deadline
        /// </summary>
        [HttpGet]
        [Route("GetProjectsByDeadLine")]
        public List<Project> GetProjectsByDeadLine()
        {
            // This code should have been in a dal class

            // Creates sql components
            SqlConnection connection = new SqlConnection(Startup.ConnectionString);
            SqlCommand command = new SqlCommand();
            command.Connection = connection;

            // This should have been a store procedure
            command.CommandText =
                "SELECT * " +
                "FROM dbo.Projects " +
                "ORDER BY Deadline; ";

            List<Project> projects = new List<Project>();

            // Reads projects form database
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while(reader.Read())
            {
                Project project = new Project();
                project.Id = reader.GetInt32(0);
                project.Name = reader.GetString(1);
                project.TimeSpent = reader.GetString(2);
                project.Deadline = reader.GetDateTime(3);
                projects.Add(project);
            }
            connection.Close();

            return projects;
        }

        public bool AreNumbersEquel(int a, int b)
        {
            if (a == b)
                return true;

            return false;
        }

        #region SEARCH_NOT_USED
        /// <summary>
        /// Used to get projects by search
        /// </summary>
        //[Route("GetProjectBySearch/{search}")]
        //public List<Project> GetProjectBySearch(string search)
        //{
        //    // This code should have been in a dal class
        //    SqlConnection connection = new SqlConnection(Startup.ConnectionString);
        //    SqlCommand command = new SqlCommand();
        //    command.Connection = connection;

        //    // This should have been a store procedure
        //    command.CommandText =
        //        "SELECT *" +
        //        "FROM dbo.Projects " +
        //        "WHERE Name LIKE @search + '%';" ;
        //    command.Parameters.AddWithValue("@search", search);

        //    List<Project> projects = new List<Project>();

        //    // Reads projects form database
        //    connection.Open();
        //    SqlDataReader reader = command.ExecuteReader();
        //    while (reader.Read())
        //    {
        //        Project project = new Project();
        //        project.Id = reader.GetInt32(0);
        //        project.Name = reader.GetString(1);
        //        project.TimeSpent = reader.GetString(2);
        //        project.Deadline = reader.GetDateTime(3);
        //        projects.Add(project);
        //    }
        //    connection.Close();

        //    return projects;
        //}
        #endregion
    }
}
