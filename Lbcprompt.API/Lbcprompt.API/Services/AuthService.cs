using System.Linq;
using System.Threading.Tasks;
using Lbcprompt.API.Data;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _ctx;
        public AuthService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<User?> RegisterAsync(UserRegisterDto dto)
        {
            // E-posta kontrolü
            if (await _ctx.Users.AnyAsync(u => u.Email == dto.Email))
                return null;

            // Şifre hashing
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(dto.Password)),
                PasswordSalt = hmac.Key,
                Role = "User"
            };

            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();
            return user;
        }

        public async Task<User?> LoginAsync(UserLoginDto dto)
        {
            var user = await _ctx.Users
                .SingleOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null) return null;

            using var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);
            var computed = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(dto.Password));

            if (!computed.SequenceEqual(user.PasswordHash))
                return null;

            return user;
        }
    }
}
