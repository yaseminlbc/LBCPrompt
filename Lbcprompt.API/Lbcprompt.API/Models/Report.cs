// Models/Report.cs

using System;
using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.Models
{
    public class Report
    {
        public int Id { get; set; }

        [Required]
        public string Reason { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int PromptId { get; set; }
        public Prompt Prompt { get; set; }

        public int ReporterId { get; set; }
        public User Reporter { get; set; }
    }
}
