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
    public partial class TableSolarType : DockContent
    {
        string sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f;";
        public TableSolarType()
        {
            InitializeComponent();
            //this.dGSolar.MouseDown += new System.Windows.Forms.MouseEventHandler (this.myDataGrid_MouseDown);
        }

        private void btnGetData_Click(object sender, EventArgs e)
        {
            using (MySqlConnection connection = new MySqlConnection(sConnection))
            {
                connection.Open();

                string sQuery = "SELECT * FROM Solarmodultyp";

                MySqlCommand command = new MySqlCommand(sQuery, connection);
                MySqlDataReader reader = command.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(reader);
                dGSolar.DataSource = dt;

            }
        }

        /*    private void myDataGrid_MouseDown(object sender, System.Windows.Forms.MouseEventArgs e)
            {
                //DataGridView myGrid = (this)sender;
                DataGridView.HitTestInfo hti;
                hti = dGSolar.HitTest(e.X, e.Y);
                string message = "You clicked ";

                Console.WriteLine(message + hti.RowIndex);

                dGSolar.get
            }*/
        // Source - https://stackoverflow.com/a/33358852
        // Posted by Gregg
        // Retrieved 2026-05-11, License - CC BY-SA 3.0

        private void dGSolar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex > -1)
            {
                var val = this.dGSolar[e.ColumnIndex, e.RowIndex].Value.ToString();
                Console.WriteLine(val);
            }
        }

    }
}
