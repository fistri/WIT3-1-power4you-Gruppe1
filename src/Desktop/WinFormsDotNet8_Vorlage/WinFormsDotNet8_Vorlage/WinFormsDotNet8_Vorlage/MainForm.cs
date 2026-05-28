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

namespace WinFormsDotNet8_Vorlage
{
    public partial class MainForm : DockContent
    {
        private readonly SideBar _sideBar;
        private readonly CustomerDetailView _customerDetailView;
        private readonly LogIn _logIn;
        private readonly SolarTypeDetailView _solarDetailView;
        private readonly CustomerTable _customerTable;
        private readonly SolarTable _solarTable;

        public MainForm()
        {
            InitializeComponent();
            mainDockPanel.Theme = new VS2015BlueTheme();

            _sideBar = new SideBar(this);
            _customerDetailView = new CustomerDetailView();
            _logIn = new LogIn();
            _solarDetailView = new SolarTypeDetailView();
            _solarTable = new SolarTable();
            _customerTable = new CustomerTable();

            LoadSidebar();
            LoadForms();
        }

        private void LoadForms()
        {
            _logIn.Show();
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
                targetForm.Activate();
            }
        }
    }
}
