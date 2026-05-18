using Microsoft.VisualBasic.ApplicationServices;
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
using WeifenLuo.WinFormsUI.Docking;
using WinFormsDotNet8_Vorlage.Models;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace WinFormsDotNet8_Vorlage
{
    public partial class LogIn : DockContent
    {
        string sConnection = @"Server=w012ac34.kasserver.com;Uid=d03a150f;Pwd=Tp678CWc859CX4Xg;Database=d03a150f;";
        public LogIn()
        {
            InitializeComponent();
            this.AcceptButton = btnLogin;
        }


        private void btnLogin_Click(object sender, EventArgs e)
        {

            using (MySqlConnection connection = new MySqlConnection(sConnection))
            {
                if (string.IsNullOrWhiteSpace(tbxName.Text) ||
               string.IsNullOrWhiteSpace(tbxPW.Text))
                {
                    MessageBox.Show("Bitte fülle beide Felder aus");
                    return;
                }
                connection.Open();

                string sQuery = $"SELECT * FROM User WHERE Username = '{tbxName.Text}'";

                MySqlCommand command = new MySqlCommand(sQuery, connection);
                MySqlDataReader reader = command.ExecuteReader();

                if( reader.Read())
                {
                    var user = new Models.User()
                    {
                        User_ID = reader.GetInt32("User_ID"),
                        Username = reader.GetString("Username"),
                        Password = reader.GetString("Password")
                    };
                    if (user.Password == tbxPW.Text)
                    {
                        this.DialogResult = DialogResult.OK;
                        this.Close();
                    }

                }
                else
                    {
                        MessageBox.Show("Ungültige Anmeldedaten");
                    }
                }
            }
        }

    }
