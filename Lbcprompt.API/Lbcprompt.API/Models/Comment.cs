// Models/Comment.cs

using System;
using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // İlişkiler
        public int PromptId { get; set; }
        public Prompt Prompt { get; set; }

        public int AuthorId { get; set; }
        public User Author { get; set; }

            public ICollection<Like> Likes { get; set; } = new List<Like>();
        

    }
}
