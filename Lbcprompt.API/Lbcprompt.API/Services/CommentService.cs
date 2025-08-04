// Services/CommentService.cs

using Lbcprompt.API.Data;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Services
{
    public class CommentService : ICommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> AddCommentAsync(CommentDto dto, int userId)
        {
            var comment = new Comment
            {
                Content = dto.Content,
                PromptId = dto.PromptId,
                AuthorId = userId
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<List<Comment>> GetCommentsByPromptIdAsync(int promptId)
        {
            return await _context.Comments
                .Where(c => c.PromptId == promptId)
                .Include(c => c.Author)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }
    }
}
