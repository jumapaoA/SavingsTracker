using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using savingsTacker.Data;
using savingsTacker.Data.Repositories.DbRepositories;
using savingsTacker.Data.Repositories.IRepositories;
using savingsTacker.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity.UI.Services;
using savingsTacker.Services;
using System.Configuration;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);
IConfiguration Configuration = new ConfigurationBuilder()
    .SetBasePath(Environment.CurrentDirectory)
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=MyDb"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

//To connect the Repositories and IRepositoriesbuilder.Services.AddScoped<IGroupMembersRepository, GroupMembersRepository>();
builder.Services.AddTransient<ISavingsRepository, SavingsRepository>();
builder.Services.AddTransient<IGroupDetailsRepository, GroupDetailsRepository>();
builder.Services.AddTransient<IGroupMembersRepository, GroupMembersRepository>();
builder.Services.AddTransient<IGroupSavingsRepository, GroupSavingsRepository>();
builder.Services.AddTransient<IActivityLogRepository, ActivityLogRepository>();
builder.Services.AddTransient<ITokensRepository, TokensRepository>();

builder.Services.AddScoped<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(Configuration);

builder.Services.ConfigureApplicationCookie(o =>
{
    o.ExpireTimeSpan = TimeSpan.FromDays(3);
    o.SlidingExpiration = true;
});

// SWAGGER FOR BACKEND DOCUMENTATION
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API Name", Version = "v1" });   
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API Name v1");
    });
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.UseCors();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
