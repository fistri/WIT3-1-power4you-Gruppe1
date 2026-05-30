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
    public partial class BaseTable : DockContent
    {
        public BaseTable()
        {
            InitializeComponent();
        }

        private void btnGetData_Click(object sender, EventArgs e)
        {
            getData();
        }

        protected virtual void getData()
        {

        }

        private void dGData_CellMouseDoubleClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            showDetail(e);
        }

        protected virtual void showDetail(DataGridViewCellMouseEventArgs e)
        {

        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            addEntry();
        }

        protected virtual void addEntry()
        {

        }

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            if (e.CloseReason == CloseReason.UserClosing)
            {
                e.Cancel = true;
                this.Hide();
            }
            else
            {
                base.OnFormClosing(e);
            }
        }
    }
}
