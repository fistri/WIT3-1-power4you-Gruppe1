using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WinFormsDotNet8_Vorlage.Models.DTOs
{
    public class KundeDTO
    {
        public string Vorname { get; set; }
        public string Nachname { get; set; }
        public string Strasse { get; set; }
        public string Hausnummer { get; set; }
        public string Postleitzahl { get; set; }
        public string Ort { get; set; }
        public string Email { get; set; }
        public string Telefonnummer { get; set; }
    }
}
