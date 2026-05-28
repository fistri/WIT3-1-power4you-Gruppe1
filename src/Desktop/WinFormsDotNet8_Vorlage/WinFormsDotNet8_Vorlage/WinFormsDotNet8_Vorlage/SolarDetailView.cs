using Google.Protobuf.Compiler;
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
    public partial class SolarDetailView : BaseDetail<Solarmodultyp>
    {
        public SolarDetailView()
        {
            InitializeComponent();
        }
        public SolarDetailView(Solarmodultyp solarmodultyp, bool isEdit) : this()
        {
            LoadDataset(solarmodultyp, isEdit);
        }

    }
}
