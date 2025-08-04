using System.Collections.Generic;
using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _svc;
        public UserController(IUserService svc)
        {
            _svc = svc;
        }

        // GET api/user
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetAll()
        {
            var list = await _svc.GetAllUsersAsync();
            return Ok(list);
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            var dto = await _svc.GetUserByIdAsync(id);
            if (dto == null) return NotFound();
            return Ok(dto);
        }
    }
}

