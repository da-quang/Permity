using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class MailRequest
    {
        public string toEmail { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
        public List<IFormFile> attachments { get; set; }
    }
}
