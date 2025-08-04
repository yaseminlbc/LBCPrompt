// Services/ILikeService.cs

using System.Threading.Tasks;

namespace Lbcprompt.API.Services
{
    public interface ILikeService
    {
        /// <summary>
        /// Beğenen kullanıcının daha önce bu promptu beğenip beğenmediğini kontrol eder.
        /// Eğer beğenmediyse yeni bir kayıt oluşturur.
        /// </summary>
        /// <returns>Beğeni oluşturulduysa true, zaten beğenilmiş veya prompt bulunamadıysa false.</returns>
        Task<bool> LikePromptAsync(int promptId, int userId);

        /// <summary>
        /// Kullanıcının bu promptu beğenip beğenmediğini döner.
        /// </summary>
        Task<bool> HasUserLikedPromptAsync(int promptId, int userId);

        /// <summary>
        /// Beğenen kullanıcının daha önce bu yorumu beğenip beğenmediğini kontrol eder.
        /// Eğer beğenmediyse yeni bir kayıt oluşturur.
        /// </summary>
        Task<bool> LikeCommentAsync(int commentId, int userId);

        /// <summary>
        /// Kullanıcının bu yorumu beğenip beğenmediğini döner.
        /// </summary>
        Task<bool> HasUserLikedCommentAsync(int commentId, int userId);
    }
}
