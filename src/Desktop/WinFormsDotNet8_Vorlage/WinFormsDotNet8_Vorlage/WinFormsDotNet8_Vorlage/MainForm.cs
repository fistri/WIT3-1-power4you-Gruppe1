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
        private readonly TableCustomer _tableCustomer;
        private readonly TableSolarType _tableSolar;

        public MainForm()
        {
            InitializeComponent();
            mainDockPanel.Theme = new VS2015BlueTheme();

            _sideBar = new SideBar(this);
            _customerDetailView = new CustomerDetailView();
            _logIn = new LogIn();
            _solarDetailView = new SolarTypeDetailView();
            _tableCustomer = new TableCustomer();
            _tableSolar = new TableSolarType();

            LoadSidebar();
            LoadForms();
        }

        private void LoadForms()
        {
            _customerDetailView.Show(mainDockPanel, DockState.Document);
            _solarDetailView.Show(mainDockPanel, DockState.Document);
            _tableCustomer.Show(mainDockPanel, DockState.Document);
            _tableSolar.Show(mainDockPanel, DockState.Document);

            _logIn.Activate();
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
                    targetForm = _tableSolar;
                    break;
                case "kunden":
                    targetForm = _tableCustomer;
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
