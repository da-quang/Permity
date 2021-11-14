using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Mitarbeiter
    {
        public int id { get; set; }

        public string kurzzeichen { get; set; }

        public string name { get; set; }

        public string personalnr { get; set; }

        public string abteilung { get; set; }

        public string team { get; set; }

        public string bereich { get; set; }

        public int timestamp { get; set; }

        public int manuell { get; set; }

        public int stammarbeitsplatz { get; set; }

        public int rot { get; set; }

        public int grün { get; set; }

        public int blau { get; set; }

        public int h { get; set; }

        public int s { get; set; }

        public int b { get; set; }

        public int sättigung { get; set; }

        public int reihenfolge { get; set; }

        public int telefon { get; set; }
        
        public int leit { get; set; }

        public int aktiv { get; set; }

        public int lehr_verant { get; set; }

        public int aufgabe_1 { get; set; }

        public int aufgabe_2 { get; set; }

        public int aufgabe_3 { get; set; }
    }
}
