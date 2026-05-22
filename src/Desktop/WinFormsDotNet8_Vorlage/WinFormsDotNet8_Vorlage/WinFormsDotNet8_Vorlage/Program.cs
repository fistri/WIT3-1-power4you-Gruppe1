using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WinFormsDotNet8_Vorlage;

internal static class Program
{
    [STAThread]
    static void Main()
    {
        var builder = Host.CreateApplicationBuilder();

        // Services registrieren
        builder.Services.AddSingleton<MainForm>(); // Singleton MainForm
        builder.Services.AddTransient<LogIn>();    // Login jedes Mal neu

        var app = builder.Build();

        ApplicationConfiguration.Initialize();

        // Login anzeigen
        var login = app.Services.GetRequiredService<LogIn>();

        if (login.ShowDialog() == DialogResult.OK)
        {
            var mainForm = app.Services.GetRequiredService<MainForm>();
            Application.Run(mainForm);
        }
    }
}