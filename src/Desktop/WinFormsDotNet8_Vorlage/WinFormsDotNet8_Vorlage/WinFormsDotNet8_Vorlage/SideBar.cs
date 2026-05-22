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
    public partial class SideBar : DockContent
    {
        private readonly MainForm _mainForm;

        public SideBar(MainForm mainForm)
        {
            InitializeComponent();
            _mainForm = mainForm;
        }


        private void btnHome_Click(object sender, EventArgs e)
        {
            _mainForm.NavigateTo("home");
        }

        private void btnSolarmodultyp_Click(object sender, EventArgs e)
        {
            _mainForm.NavigateTo("solarmodultyp");
        }

        private void btnCustomer_Click(object sender, EventArgs e)
        {
            _mainForm.NavigateTo("kunden");
        }
    }
}
