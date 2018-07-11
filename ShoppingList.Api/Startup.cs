using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ShoppingList.Api.Data;
using ShoppingList.Api.Services;
using ShoppingList.Api.SignalR;
using Swashbuckle.AspNetCore.Swagger;

namespace ShoppingList.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ShoppingListDbContext>(options =>
            options.UseInMemoryDatabase("ShoppingLists"));

            services.AddSignalR();

            services.AddTransient<IShoppingListNotificationService, ShoppingListNotificationService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "ShoppingLists API", Version = "v1" });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            
           

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShoppingLists V1");
            });
            app.UseCors(options =>
           options
               .AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials()
           );
            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseSignalR(route =>
            {
                route.MapHub<ShoppingListHub>("/hubs/shoppingLists");
            });
        }
    }
}
