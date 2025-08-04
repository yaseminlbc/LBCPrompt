using System.Collections.Generic;
using System.Threading.Tasks;
using Lbcprompt.API.DTOs;

namespace Lbcprompt.API.Services
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
    }
}
