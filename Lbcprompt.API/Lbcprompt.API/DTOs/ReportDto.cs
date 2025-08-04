// DTOs/ReportDto.cs

using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.DTOs
{
    public class ReportDto
    {
        [Required]
        public int PromptId { get; set; }

        [Required]
        [MinLength(5)]
        public string Reason { get; set; }
    }
}
