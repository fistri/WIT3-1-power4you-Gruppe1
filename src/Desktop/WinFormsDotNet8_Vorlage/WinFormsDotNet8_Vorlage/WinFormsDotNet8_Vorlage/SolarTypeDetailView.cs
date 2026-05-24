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

namespace WinFormsDotNet8_Vorlage
{
    public partial class SolarTypeDetailView : DockContent
    {
        public SolarTypeDetailView()
        {
        }

        public SolarTypeDetailView(Solarmodultyp solarTyp)
        {
            InitializeComponent();

            tbxNummer.Text = solarTyp.Solarmodultypnummer.ToString();
            tbxBez.Text = solarTyp.Bezeichnung;
            tbxUmpp.Text = solarTyp.Umpp.ToString();
            tbxImpp.Text = solarTyp.Impp.ToString();
            tbxPmpp.Text = solarTyp.Pmpp.ToString();
        }
    }
}
