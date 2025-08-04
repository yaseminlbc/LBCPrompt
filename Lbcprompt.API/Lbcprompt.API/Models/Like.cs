// Models/Like.cs
using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.Models
{
    public class Like
    {
        [Key]
        public int Id { get; set; }

        // Beğenen kullanıcı
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // Beğenilen prompt (nullable)
        public int? PromptId { get; set; }
        public Prompt? Prompt { get; set; }

        // Beğenilen yorum (nullable)
        public int? CommentId { get; set; }
        public Comment? Comment { get; set; }
    }
}
