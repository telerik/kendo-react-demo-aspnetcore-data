using Microsoft.EntityFrameworkCore;
using ReactWithRestApi.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// CORS is set to allow any origin to access the web API.
// If your front end is on a domain, you will need to change this to the domain of your front end so that only requests from your domain can use the REST API
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowAllOrigins", policy  => { policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin(); });
});


builder.Services.AddDbContext<SalesDbContext>(options => 
{
    //options.UseSqlServer(builder.Configuration.GetConnectionString("MySqlServer"));  // If using SQL server, use this instead (and connection string defined in appsettings.json).
    options.UseSqlite("Data Source=Sales.db", b => b.MigrationsAssembly("ReactWithRestApi.Server")); 
});

builder.Services.AddControllers();

// These gives you a nice swagger UI where you can see and interact with the REST endpoints (at ~/swagger/index.html)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// when using Sqlite, this ensures the database is created and migrated to the latest version (not really needed for SQL server)
using (var serviceScope = app.Services.CreateScope())
{
    var dbContext = serviceScope.ServiceProvider.GetRequiredService<SalesDbContext>();
    await dbContext.Database.EnsureCreatedAsync();
    if (dbContext.Database.GetPendingMigrations().Any())
        await dbContext.Database.MigrateAsync();
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Only use Swagger in development, you do not want this page to be available for production deployments
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseCors("_myAllowAllOrigins");

app.Run();
