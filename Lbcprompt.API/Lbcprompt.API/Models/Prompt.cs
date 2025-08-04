using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lbcprompt.API.Models
{
    public class Prompt
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public bool IsApproved { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //  Author ilişkisi
        public int AuthorId { get; set; }
        public User? Author { get; set; }

        //  Category ilişkisi
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        //  Yorumlar
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        //  Beğeniler (Like entity’si)
        public ICollection<Like> Likes { get; set; } = new List<Like>();

        //  Raporlar
        public ICollection<Report> Reports { get; set; } = new List<Report>();

        //  Tag’ler
        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
