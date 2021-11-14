using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Auftrag
    {
        public int id { get; set; }

        public string ksv { get; set; }

        public string auftraggeber { get; set; }

        public string auftragnehmer { get; set; }

        public string sperren { get; set; }

        public string kommentar { get; set; }

        public string status { get; set; }

        public DateTime von { get; set; }

        public DateTime bis { get; set; }

    }
}
