using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Settings
{
    public class MailSettings
    {
        public string mail { get; set; }
        public string displayName { get; set; }
        public string password { get; set; }
        public string host { get; set; }
        public int port { get; set; }
    }
}
