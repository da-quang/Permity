using backend.Models;
using backend.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings mailSettings;
        public MailService(IOptions<MailSettings>options)
        {
            mailSettings = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(mailSettings.mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.empfänger));
            email.Subject = mailRequest.betreff;

            var builder = new BodyBuilder();
            if (mailRequest.attachments != null)
            {   
                byte[] fileBytes;
                foreach (var file in mailRequest.attachments)
                {
                    if(file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = mailRequest.mailtext;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(mailSettings.host, mailSettings.port, SecureSocketOptions.StartTls);
            smtp.Authenticate(mailSettings.mail, mailSettings.password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
