using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Services
{
    public interface IAuthService
    {
        /// <summary>
        /// Yeni kullanıcı kaydeder. E-posta zaten varsa null döner.
        /// </summary>
        Task<User?> RegisterAsync(UserRegisterDto dto);

        /// <summary>
        /// Mevcut kullanıcıyı email+şifre ile doğrular. Başarılıysa User, değilse null.
        /// </summary>
        Task<User?> LoginAsync(UserLoginDto dto);
    }
}
