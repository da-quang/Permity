using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : Controller
    {
        /*
        * Sending a Mail
        *
        * edit by David Nguyen
        * 15.01.2022
        */
        //api/Email/send
        [HttpPost("send")]
        public void send(string email)
        {
            try
            {
                SmtpClient client = new SmtpClient("smtp-mail.outlook.com");
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                System.Net.NetworkCredential credential = new System.Net.NetworkCredential("da.quang@outlook.com", "DVDfz2002");
                client.EnableSsl = true;
                client.Credentials = credential;

                MailMessage message = new MailMessage("da.quang@outlook.com", email);
                message.Subject = "Neuer Auftrag";
                message.Body = "<div>Bitte bestätigten Sie den Auftrag in dem Sie die Permity App öffnen</div>" +
                               "<a href='https://palmiest-hornet-1388.dataplicity.io/mitarbeiter/login'>Permity öffnen</a>";
                message.IsBodyHtml = true;
                client.Send(message);
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}
