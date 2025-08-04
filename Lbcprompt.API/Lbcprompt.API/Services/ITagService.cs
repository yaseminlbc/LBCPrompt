// Services/ITagService.cs
using Lbcprompt.API.DTOs;

namespace Lbcprompt.API.Services
{
    public interface ITagService
    {
        Task<IEnumerable<TagDto>> GetAllAsync();
        Task<TagDto?> GetByIdAsync(int id);
        Task<TagDto> CreateAsync(string name);
        Task<bool> DeleteAsync(int id);
    }
}
