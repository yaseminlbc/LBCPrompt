// Services/ILikeService.cs

using System.Threading.Tasks;

namespace Lbcprompt.API.Services
{
    public interface ILikeService
    {
        
        Task<bool> LikePromptAsync(int promptId, int userId);

       
        Task<bool> HasUserLikedPromptAsync(int promptId, int userId);

        
        Task<bool> LikeCommentAsync(int commentId, int userId);

        
        Task<bool> HasUserLikedCommentAsync(int commentId, int userId);
    }
}
