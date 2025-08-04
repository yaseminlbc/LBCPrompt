// Controllers/PromptController.cs

using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]
    public class PromptController : ControllerBase
    {
        private readonly IPromptService _promptService;
        private readonly IMapper _mapper;

        public PromptController(IPromptService promptService, IMapper mapper)
        {
            _promptService = promptService;
            _mapper = mapper;
        }

        // Tüm promptları getir
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PromptDto>>> GetAll()
        {
            var list = await _promptService.GetAllPromptsAsync();
            return Ok(_mapper.Map<IEnumerable<PromptDto>>(list));
        }

        // ID ile tek prompt getir
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<PromptDto>> GetById(int id)
        {
            var prompt = await _promptService.GetPromptByIdAsync(id);
            if (prompt == null) return NotFound();
            return Ok(_mapper.Map<PromptDto>(prompt));
        }

        // Yeni prompt oluştur
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PromptDto>> Create([FromBody] PromptDto dto)
        {
            // Kullanıcı id'sini al (JWT zorunlu)
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            // Service ile prompt ekle
            var created = await _promptService.CreatePromptAsync(dto, userId);

            // Başarıyla eklenince 201 Created dön
            return CreatedAtAction(
                nameof(GetById),
                new { id = created.Id },
                _mapper.Map<PromptDto>(created)
            );
        }
    }
}
