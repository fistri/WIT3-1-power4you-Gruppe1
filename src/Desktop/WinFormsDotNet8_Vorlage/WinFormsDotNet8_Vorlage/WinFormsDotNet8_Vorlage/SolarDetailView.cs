using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Google.Protobuf.Compiler;
using MySql.Data.MySqlClient;
using WinFormsDotNet8_Vorlage.Models;

namespace WinFormsDotNet8_Vorlage
{
    public partial class SolarDetailView : BaseDetail<Solarmodultyp>
    {
        private readonly string _sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f";

        public SolarDetailView()
        {
            InitializeComponent();
        }
        public SolarDetailView(Solarmodultyp solarmodultyp, bool isEdit) : this()
        {
            LoadDataset(solarmodultyp, isEdit);
        }
            
        protected override void SaveToDatabase(Solarmodultyp dataset, bool isEdit)
        {
            using (var connection = new MySqlConnection(_sConnection))
            {
                connection.Open();
                string sQuery;

                if (isEdit)
                {
                    sQuery = @"UPDATE Solarmodultyp SET
                        Bezeichnung=@Bezeichnung, Umpp=@Umpp, Impp=@Impp,
                        Pmpp=@Pmpp WHERE Solarmodultypnummer=@Solarmodultypnummer";
                }
                else
                {
                    sQuery = @"INSERT INTO Solarmodultyp
                        (Bezeichnung, Umpp, Impp, Pmpp)
                        VALUES
                        (@Bezeichnung, @Umpp, @Impp, @Pmpp)";
                }

                using var cmd = new MySqlCommand(sQuery, connection);

                if (isEdit)
                    cmd.Parameters.AddWithValue("@Solarmodultypnummer", dataset.Solarmodultypnummer);

                cmd.Parameters.AddWithValue("@Bezeichnung", dataset.Bezeichnung);
                cmd.Parameters.AddWithValue("@Umpp", dataset.Umpp);
                cmd.Parameters.AddWithValue("@Impp", dataset.Impp);
                cmd.Parameters.AddWithValue("@Pmpp", dataset.Pmpp);

                if (cmd.ExecuteNonQuery() == 1)
                    MessageBox.Show("Saved successfully");
                else
                    MessageBox.Show("Error while saving");
            }
            this.Dispose();
        }

        protected override void DeleteDataset()
        {
            var confirm = MessageBox.Show(
                $"Do you really want to delete solar module type '{dataset.Bezeichnung}'?\n" +
                "All corresponding solar modules and their performance data will also be deleted!",
                "Confirm deletion", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);

            if (confirm != DialogResult.Yes) return;

            using (var connection = new MySqlConnection(_sConnection))
            {
                connection.Open();
                using var transaction = connection.BeginTransaction();
                try
                {
                    // Delete power data of the solar modules with that type
                    var cmdLeistung = new MySqlCommand(@"
                        DELETE l FROM Leistung l
                        INNER JOIN Solarmodul s ON l.Modulnummer = s.Modulnummer
                        WHERE s.Solarmodultypnummer = @Solarmodultypnummer",
                        connection, transaction);
                    cmdLeistung.Parameters.AddWithValue("@Solarmodultypnummer", dataset.Solarmodultypnummer);
                    cmdLeistung.ExecuteNonQuery();

                    // Delete solar modules of the customer
                    var cmdSolar = new MySqlCommand(
                        "DELETE FROM Solarmodul WHERE Solarmodultypnummer = @Solarmodultypnummer",
                        connection, transaction);
                    cmdSolar.Parameters.AddWithValue("@Solarmodultypnummer", dataset.Solarmodultypnummer);
                    cmdSolar.ExecuteNonQuery();

                    // Delete the solar module type
                    var cmdKunde = new MySqlCommand(
                        "DELETE FROM Solarmodultyp WHERE Solarmodultypnummer = @Solarmodultypnummer",
                        connection, transaction);
                    cmdKunde.Parameters.AddWithValue("@Solarmodultypnummer", dataset.Solarmodultypnummer);
                    cmdKunde.ExecuteNonQuery();

                    transaction.Commit();
                    MessageBox.Show("Solar modul type and all corresponding data deleted successfully.");
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    MessageBox.Show($"Error deleting: {ex.Message}", "Error",
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
            }

            this.Dispose();
        }
    }
}
