using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserRegisterDto dto);

        Task<User?> LoginAsync(UserLoginDto dto);
    }
}
