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
using MySql.Data.MySqlClient;
using System.Data.Common;

namespace WinFormsDotNet8_Vorlage
{
    public partial class CustomerDetailView : DockContent
    {
        string sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f;";

        public CustomerDetailView()
        {
            InitializeComponent();
        }

        private void btnGetData_Click(object sender, EventArgs e)
        {
            using (MySqlConnection connection = new MySqlConnection(sConnection))
            {
                connection.Open();

                string sQuery = "SELECT * FROM ";
            }
        }
    }
}
