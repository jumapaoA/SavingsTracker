using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace savingsTacker.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        public const string FROM_EMAIL = "ajumapao@fullscale.io";
        public const string FROM_EMAIL_GIVEN_NAME = "Bunny Bucks: Savings Tracker";
        private string _sendGridApiKey;
        public static string TEMPLATE_ID { get; set; } = "";
        public static string EMAIL_LINK { get; set; } = "";
        public static string NAME { get; set; } = "";

        public AuthMessageSenderOptions Options { get; }

        public EmailSender(IConfiguration configuration, IOptions<AuthMessageSenderOptions> optionsAccessor, ILogger<EmailSender> logger)
        {
            Options = optionsAccessor.Value;
            _logger = logger;
            _configuration = configuration;
            _sendGridApiKey = _configuration.GetValue<string>("SENDGRID_API_KEY");
        }
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            if (string.IsNullOrEmpty(_sendGridApiKey)) throw new Exception("Null Send Grid Key");

            await Execute(_sendGridApiKey, subject, body, toEmail);
        }

        private async Task Execute(string apiKey, string subject, string body, string toEmail)
        {
            var client = new SendGridClient(apiKey);
            var newMessage = new SendGridMessage()
            {
                From = new EmailAddress(FROM_EMAIL, FROM_EMAIL_GIVEN_NAME),
                Subject = subject,
                HtmlContent = body
            };
            newMessage.AddTo(new EmailAddress(toEmail));
            newMessage.SetClickTracking(false, false);
            newMessage.SetTemplateId(TEMPLATE_ID);
            newMessage.SetTemplateData(new
            {
                EmailLink = EMAIL_LINK,
                name = NAME
            });
            
            var response = await client.SendEmailAsync(newMessage);
            _logger.LogInformation(response.IsSuccessStatusCode ? $"Email to {toEmail} queued successfully!"
                : $"Failure Email to {toEmail}");
        }
    }
}