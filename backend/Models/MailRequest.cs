using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class MailRequest
    {
        public string empfänger { get; set; }
        public string betreff { get; set; }
        public string mailtext { get; set; }
        public List<IFormFile> attachments { get; set; }
    }
}
