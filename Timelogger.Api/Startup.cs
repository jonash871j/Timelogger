using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Timelogger.Models;

namespace Timelogger.Api
{
    public class Startup
    { 
        public static string ConnectionString { get; private set; } = ""; // Not a great solution
        private readonly IWebHostEnvironment _environment;
        public IConfigurationRoot Configuration { get; }

        public Startup(IWebHostEnvironment env)
        {
            _environment = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Gets connection string from appsettings 
            ConnectionString = Configuration.GetConnectionString("DevConnection");

            services.AddControllers();

            // Is using database
            services.AddDbContext<ProjectContext>(options =>
            options.UseSqlServer(ConnectionString));

            services.AddLogging(builder =>
            {
                builder.AddConsole();
                builder.AddDebug();
            });

            services.AddMvc(options => options.EnableEndpointRouting = false);

            if (_environment.IsDevelopment())
            {
                services.AddCors();
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());
            }

            app.UseMvc();
        }
    }
}
