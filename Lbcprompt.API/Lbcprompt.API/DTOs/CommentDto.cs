namespace Lbcprompt.API.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public int PromptId { get; set; }        // ← BU SATIRI EKLE
        public int AuthorId { get; set; }
        public string? AuthorName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
