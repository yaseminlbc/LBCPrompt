// Controllers/AuthController.cs

using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;

        public AuthController(IAuthService authService, IJwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            var user = await _authService.RegisterAsync(dto);
            if (user == null)
                return BadRequest(new { message = "E-posta zaten kullanımda." });

           
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name,           user.Username),
                new Claim(ClaimTypes.Role,           user.Role)
            };

            var token = _jwtService.GenerateToken(claims);

            return Ok(new
            {
                token,
                user = new { user.Id, user.Username, user.Email, user.Role }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var user = await _authService.LoginAsync(dto);
            if (user == null)
                return Unauthorized(new { message = "Geçersiz kimlik bilgileri." });

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name,           user.Username),
                new Claim(ClaimTypes.Role,           user.Role)
            };

            var token = _jwtService.GenerateToken(claims);

            return Ok(new
            {
                token,
                user = new { user.Id, user.Username, user.Email, user.Role }
            });
        }
    }
}
