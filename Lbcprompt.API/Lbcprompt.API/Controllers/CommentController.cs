// Controllers/CommentController.cs

using Lbcprompt.API.DTOs;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Lbcprompt.API.Data;       
using Lbcprompt.API.Models;     
     

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddComment([FromBody] CommentDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var result = await _commentService.AddCommentAsync(dto, userId);
            return Ok(result);
        }

        [HttpGet("prompt/{promptId}")]
        public async Task<IActionResult> GetByPrompt(int promptId)
        {
            var result = await _commentService.GetCommentsByPromptIdAsync(promptId);
            return Ok(result);
        }
    }
}

