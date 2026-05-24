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
    public partial class CustomerTable : BaseTable
    {
        public CustomerTable()
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

                string sQuery = "SELECT * FROM Kunde";

                MySqlCommand command = new MySqlCommand(sQuery, connection);
                MySqlDataReader reader = command.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(reader);
                dGData.DataSource = dt;
                reader.Close();
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
                DataGridViewRow row = dGData.Rows[e.RowIndex];

                int id = Convert.ToInt32(row.Cells["Solarmodultypnummer"].Value);
                Kunde kunde = new Kunde();

                using (MySqlConnection connection = new MySqlConnection(sConnection))
                {
                    connection.Open();

                    string sQuery = $"SELECT * FROM Kunde WHERE Solarmodultypnummer = {id}";

                    MySqlCommand command = new MySqlCommand(sQuery, connection);
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        kunde.Kundennummer = reader.GetInt32("Kundennummer");
                        kunde.User_ID = reader.GetInt32("User_ID");
                        kunde.Vorname = reader.GetString("Vorname");
                        kunde.Nachname = reader.GetString("Nachname");
                        kunde.Strasse = reader.GetString("Strasse");
                        kunde.Hausnummer = reader.GetString("Hausnummer");
                        kunde.Postleitzahl = reader.GetString("Postleitzahl");
                        kunde.Ort = reader.GetString("Ort");
                        kunde.Email = reader.GetString("Email");
                        kunde.Telefonnummer = reader.GetString("Telefonnummer");
                    }
                }
                // SolarTypeDetailView detail = new SolarTypeDetailView(kunde);
                // detail.Show();
            }
        }
    }
}
