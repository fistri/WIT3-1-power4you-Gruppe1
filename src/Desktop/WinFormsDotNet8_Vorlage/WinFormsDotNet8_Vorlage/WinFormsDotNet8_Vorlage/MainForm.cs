using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;
using WinFormsDotNet8_Vorlage.Models;

namespace WinFormsDotNet8_Vorlage
{
    public partial class MainForm : DockContent
    {
        private SideBar _sideBar;
        private CustomerDetailView _customerDetailView;
        private SolarTypeDetailView _solarDetailView;
        private CustomerTable _customerTable;
        private SolarTable _solarTable;

        public User? CurrentUser { get; private set; }

        public MainForm()
        {
            InitializeComponent();
            mainDockPanel.Theme = new VS2015BlueTheme();

            this.Load += MainForm_Load;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            if (!ShowLogin())
            {
                Application.Exit();
                return;
            }

            _sideBar = new SideBar(this);
            _customerDetailView = new CustomerDetailView();
            _solarDetailView = new SolarTypeDetailView();
            _solarTable = new SolarTable();
            _customerTable = new CustomerTable();

            LoadSidebar();
        }

        private bool ShowLogin()
        {
            using (var logIn = new LogIn())
            {
                DialogResult result = logIn.ShowDialog();
                if (result != DialogResult.OK || logIn.LoggedInUser == null)
                    return false;

                CurrentUser = logIn.LoggedInUser;
                return true;
            }
        }

        private void LoadSidebar()
        {
            _sideBar.Show(mainDockPanel, DockState.DockLeft);
        }

        internal void NavigateTo(string target)
        {
            DockContent targetForm = null;

            switch (target.ToLower())
            {
                case "solarmodultyp":
                    targetForm = _solarTable;
                    break;
                case "kunden":
                    targetForm = _customerTable;
                    break;
                case "firmen":
                    // targetForm = _predictionForm;
                    break;
                default:
                    MessageBox.Show($"Unbekanntes Ziel: {target}");
                    break;
            }

            if (targetForm != null)
            {
                targetForm.Show(mainDockPanel, DockState.Document);
            }
        }
    }
}