// Services/IPromptService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Services
{
    public interface IPromptService
    {
        /// <summary>
        /// Yeni bir prompt oluşturur. Kullanıcı kimliği parametre olarak verilir.
        /// </summary>
        Task<Prompt> CreatePromptAsync(PromptDto dto, int userId);

        /// <summary>
        /// Tüm promptları yazar, tag ve beğeni ilişkileriyle birlikte döner.
        /// </summary>
        Task<List<Prompt>> GetAllPromptsAsync();

        /// <summary>
        /// Belirli bir promptu ID’siyle döner.
        /// </summary>
        Task<Prompt?> GetPromptByIdAsync(int id);
    }
}
