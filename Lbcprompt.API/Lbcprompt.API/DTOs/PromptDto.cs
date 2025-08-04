// DTOs/PromptDto.cs

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.DTOs
{
    public class PromptDto
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        // Eğer DTO’da likes count gösterecekseniz
        public int Likes { get; set; }

        public DateTime CreatedAt { get; set; }

        public int AuthorId { get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public UserDto? Author { get; set; }

        public bool IsApproved { get; set; }

        // ➤ Mutlaka initialize edin:
        public List<string> Tags { get; set; } = new List<string>();
    }
}
