// Services/ICommentService.cs

using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Services
{
    public interface ICommentService
    {
        Task<Comment> AddCommentAsync(CommentDto dto, int userId);
        Task<List<Comment>> GetCommentsByPromptIdAsync(int promptId);
    }
}
