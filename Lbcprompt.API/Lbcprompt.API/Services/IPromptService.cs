// Services/IPromptService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Services
{
    public interface IPromptService
    {
        Task<Prompt> CreatePromptAsync(PromptDto dto, int userId);

        Task<List<Prompt>> GetAllPromptsAsync();

        Task<Prompt?> GetPromptByIdAsync(int id);
    }
}
