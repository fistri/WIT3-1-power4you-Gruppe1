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

        var app = builder.Build();

        ApplicationConfiguration.Initialize();


        var mainForm = app.Services.GetRequiredService<MainForm>();
        Application.Run(mainForm);

    }
}