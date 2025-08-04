using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MinLength(3)]
        public string Username { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;

        public string Role { get; set; } = "User";

        // NAVIGATION:
        public ICollection<Prompt> Prompts { get; set; } = new List<Prompt>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<Report> Reports { get; set; } = new List<Report>();
        public ICollection<Like> Likes { get; set; } = new List<Like>();
    }
}
