// Services/LikeService.cs

using System.Threading.Tasks;
using Lbcprompt.API.Data;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Services
{
    public class LikeService : ILikeService
    {
        private readonly ApplicationDbContext _ctx;

        public LikeService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<bool> LikePromptAsync(int promptId, int userId)
        {
            if (await _ctx.Likes.AnyAsync(l => l.PromptId == promptId && l.UserId == userId))
                return false;

            
            var promptExists = await _ctx.Prompts.AnyAsync(p => p.Id == promptId);
            if (!promptExists)
                return false;

            
            var like = new Like
            {
                PromptId = promptId,
                UserId = userId
            };

            _ctx.Likes.Add(like);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> HasUserLikedPromptAsync(int promptId, int userId)
        {
            return await _ctx.Likes
                .AnyAsync(l => l.PromptId == promptId && l.UserId == userId);
        }

        public async Task<bool> LikeCommentAsync(int commentId, int userId)
        {
            if (await _ctx.Likes.AnyAsync(l => l.CommentId == commentId && l.UserId == userId))
                return false;

            var commentExists = await _ctx.Comments.AnyAsync(c => c.Id == commentId);
            if (!commentExists)
                return false;

            var like = new Like
            {
                CommentId = commentId,
                UserId = userId
            };

            _ctx.Likes.Add(like);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> HasUserLikedCommentAsync(int commentId, int userId)
        {
            return await _ctx.Likes
                .AnyAsync(l => l.CommentId == commentId && l.UserId == userId);
        }
    }
}
