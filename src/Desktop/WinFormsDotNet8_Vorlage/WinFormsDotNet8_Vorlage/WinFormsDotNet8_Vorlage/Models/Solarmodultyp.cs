using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WinFormsDotNet8_Vorlage.Models
{
    public class Solarmodultyp
    {
        public int Solarmodultypnummer { get; set; }
        public string Bezeichnung { get; set; }
        public float Umpp { get; set; }
        public float Impp { get; set; }
        public float Pmpp { get; set; }
    }
}
