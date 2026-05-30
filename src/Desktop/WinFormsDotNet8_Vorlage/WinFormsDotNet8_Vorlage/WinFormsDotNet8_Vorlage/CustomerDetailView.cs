using Google.Protobuf.Compiler;
using MySql.Data.MySqlClient;
using Mysqlx.Crud;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;
using WinFormsDotNet8_Vorlage.Models;
using WinFormsDotNet8_Vorlage.Models.DTOs;

namespace WinFormsDotNet8_Vorlage
{
    public partial class CustomerDetailView : BaseDetail<KundeDTO>
    {
        private readonly int _loggedInUserId;
        private readonly string _sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f;";

        public CustomerDetailView()
        {
            InitializeComponent();
        }
        public CustomerDetailView(KundeDTO kunde, bool isEdit) : this()
        {
            LoadDataset(kunde, isEdit);
        }

        protected override void SaveToDatabase(KundeDTO dataset, bool isEdit)
        {
            using (MySqlConnection connection = new MySqlConnection(_sConnection))
            {
                string sQuery = "SELECT * FROM Kunde";
                connection.Open();
                if (isEdit)
                {
                    sQuery = @"
                UPDATE Kunde
                SET Kundennummer = @Kundennummer,
                    User_ID = @User_ID,
                    Vorname = @Vorname,
                    Nachname = @Nachname,
                    Strasse = @Strasse,
                    Hausnummer = @Hausnummer,
                    Postleitzahl = @Postleitzahl,
                    Ort = @Ort,
                    Email = @Email,
                    Telefonnummer = @Telefonnummer
                WHERE Kundennummer = @Kundennummer";

                }
                else
                {
                    sQuery = "SELECT * FROM Kunde";
                }

                using var cmd = new MySqlCommand(sQuery, connection);

                //cmd.Parameters.Add("@User_ID", MySqlDbType.Int32).Value = dataset.User_ID;
                cmd.Parameters.Add("@Vorname", MySqlDbType.String).Value = dataset.Vorname;
                cmd.Parameters.Add("@Nachname", MySqlDbType.String).Value = dataset.Nachname;
                cmd.Parameters.Add("@Strasse", MySqlDbType.String).Value = dataset.Strasse;
                cmd.Parameters.Add("@Hausnummer", MySqlDbType.String).Value = dataset.Hausnummer;
                cmd.Parameters.Add("@Postleitzahl", MySqlDbType.String).Value = dataset.Postleitzahl;
                cmd.Parameters.Add("@Ort", MySqlDbType.String).Value = dataset.Ort;
                cmd.Parameters.Add("@Email", MySqlDbType.String).Value = dataset.Email;
                cmd.Parameters.Add("@Telefonnummer", MySqlDbType.String).Value = dataset.Telefonnummer;
                if(cmd.ExecuteNonQuery() == 1)
                {
                    MessageBox.Show("Saved successfully");
                } else
                {
                    MessageBox.Show("Error while saving");
                }
            }
            
            this.Close();
        }
    }
}
