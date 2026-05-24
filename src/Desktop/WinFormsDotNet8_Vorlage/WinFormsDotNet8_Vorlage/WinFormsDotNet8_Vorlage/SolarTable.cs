using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WinFormsDotNet8_Vorlage.Models;

namespace WinFormsDotNet8_Vorlage
{
    public partial class SolarTable : BaseTable
    {
        public SolarTable()
        {
            InitializeComponent();
        }

        string sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f;";

        private void btnGetData_Click(object sender, EventArgs e)
        {
            getData();
        }
        protected override void getData()
        {
            using (MySqlConnection connection = new MySqlConnection(sConnection))
            {
                connection.Open();

                string sQuery = "SELECT * FROM Solarmodultyp";

                MySqlCommand command = new MySqlCommand(sQuery, connection);
                MySqlDataReader reader = command.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(reader);
                base.dGData.DataSource = dt;

            }
        }
        private void dGData_CellMouseDoubleClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            showDetail(e);
        }
        protected override void showDetail(DataGridViewCellMouseEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                DataGridViewRow row = base.dGData.Rows[e.RowIndex];

                int id = Convert.ToInt32(row.Cells["Solarmodultypnummer"].Value);
                Solarmodultyp solarTyp = new Solarmodultyp();

                using (MySqlConnection connection = new MySqlConnection(sConnection))
                {
                    connection.Open();

                    string sQuery = $"SELECT * FROM Solarmodultyp WHERE Solarmodultypnummer = {id}";

                    MySqlCommand command = new MySqlCommand(sQuery, connection);
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        solarTyp.Solarmodultypnummer = reader.GetInt32("Solarmodultypnummer");
                        solarTyp.Bezeichnung = reader.GetString("Bezeichnung");
                        solarTyp.Umpp = reader.GetFloat("Umpp");
                        solarTyp.Impp = reader.GetFloat("Impp");
                        solarTyp.Pmpp = reader.GetFloat("Pmpp");
                    }
                }
                SolarTypeDetailView detail = new SolarTypeDetailView(solarTyp);
                detail.Show();
            }
        }
    }
}
