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

namespace WinFormsDotNet8_Vorlage
{
    public partial class CustomerDetailView : BaseDetail<Kunde>
    {
        private readonly string _sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f";

        public CustomerDetailView() { InitializeComponent(); }

        public CustomerDetailView(Kunde kunde, bool isEdit) : this()
        {
            LoadDataset(kunde, isEdit);
        }

        protected override Dictionary<int, string> GetDropdownOptionsFor(string propertyName)
        {
            if (propertyName != "User_ID")
                return new Dictionary<int, string>();

            var result = new Dictionary<int, string>();

            using (var connection = new MySqlConnection(_sConnection))
            {
                connection.Open();
                var cmd = new MySqlCommand("SELECT User_ID, Username FROM User", connection);
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    result[reader.GetInt32("User_ID")] = reader.GetString("Username");
                }
            }

            return result;
        }

        protected override void SaveToDatabase(Kunde dataset, bool isEdit)
        {
            using (var connection = new MySqlConnection(_sConnection))
            {
                connection.Open();
                string sQuery;

                if (isEdit)
                {
                    sQuery = @"UPDATE Kunde SET
                    Vorname=@Vorname, Nachname=@Nachname, Strasse=@Strasse,
                    Hausnummer=@Hausnummer, Postleitzahl=@Postleitzahl,
                    Ort=@Ort, Email=@Email, Telefonnummer=@Telefonnummer
                    WHERE Kundennummer=@Kundennummer";
                }
                else
                {
                    sQuery = @"INSERT INTO Kunde
                    (User_ID, Vorname, Nachname, Strasse, Hausnummer, Postleitzahl, Ort, Email, Telefonnummer)
                    VALUES
                    (@User_ID, @Vorname, @Nachname, @Strasse, @Hausnummer, @Postleitzahl, @Ort, @Email, @Telefonnummer)";
                }

                using var cmd = new MySqlCommand(sQuery, connection);

                if (isEdit) cmd.Parameters.AddWithValue("@Kundennummer", dataset.Kundennummer);

                cmd.Parameters.AddWithValue("@User_ID", dataset.User_ID);
                cmd.Parameters.AddWithValue("@Vorname", dataset.Vorname);
                cmd.Parameters.AddWithValue("@Nachname", dataset.Nachname);
                cmd.Parameters.AddWithValue("@Strasse", dataset.Strasse);
                cmd.Parameters.AddWithValue("@Hausnummer", dataset.Hausnummer);
                cmd.Parameters.AddWithValue("@Postleitzahl", dataset.Postleitzahl);
                cmd.Parameters.AddWithValue("@Ort", dataset.Ort);
                cmd.Parameters.AddWithValue("@Email", dataset.Email);
                cmd.Parameters.AddWithValue("@Telefonnummer", dataset.Telefonnummer);

                if (cmd.ExecuteNonQuery() == 1)
                    MessageBox.Show("Saved successfully");
                else
                    MessageBox.Show("Error while saving");
            }
            this.Hide();
        }

        protected override void DeleteDataset()
        {
            var confirm = MessageBox.Show(
                $"Do you really want to delete Customer '{dataset.Vorname} {dataset.Nachname}'?\n" +
                "All corresponding solar modules will be deleted!",
                "Accept", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);

            if (confirm != DialogResult.Yes) return;

            using (var connection = new MySqlConnection(_sConnection))
            {
                connection.Open();

                using var transaction = connection.BeginTransaction();
                try
                {
                    var cmdSolar = new MySqlCommand(
                        "DELETE FROM Solarmodul WHERE Kundennummer = @Kundennummer",
                        connection, transaction);
                    cmdSolar.Parameters.AddWithValue("@Kundennummer", dataset.Kundennummer);
                    cmdSolar.ExecuteNonQuery();

                    var cmdKunde = new MySqlCommand(
                        "DELETE FROM Kunde WHERE Kundennummer = @Kundennummer",
                        connection, transaction);
                    cmdKunde.Parameters.AddWithValue("@Kundennummer", dataset.Kundennummer);
                    cmdKunde.ExecuteNonQuery();

                    transaction.Commit();
                    MessageBox.Show("Kunde und zugehörige Solarmodule gelöscht.");
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    MessageBox.Show($"Error deleting: {ex.Message}", "Error",
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
            }

            this.Hide();
        }
    }
}
