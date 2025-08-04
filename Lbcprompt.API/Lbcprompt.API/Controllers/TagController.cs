// Controllers/TagController.cs
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lbcprompt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        // GET: api/Tag
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tags = await _tagService.GetAllAsync();
            return Ok(tags);
        }

        // GET: api/Tag/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var tag = await _tagService.GetByIdAsync(id);
            if (tag == null) return NotFound();
            return Ok(tag);
        }

        // POST: api/Tag
        [HttpPost]
        [Authorize]          // rol bazlı limit isterseniz [Authorize(Roles="Admin")]
        public async Task<IActionResult> Create([FromBody] TagDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name is required.");

            var created = await _tagService.CreateAsync(dto.Name);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        // DELETE: api/Tag/5
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _tagService.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
