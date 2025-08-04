// Controllers/LikeController.cs
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _likeService;

        public LikeController(ILikeService likeService)
        {
            _likeService = likeService;
        }

        // POST: api/like/prompt/{promptId}
        [HttpPost("prompt/{promptId}")]
        public async Task<IActionResult> LikePrompt(int promptId)
        {
            var userId = GetUserId();
            var created = await _likeService.LikePromptAsync(promptId, userId);
            if (!created)
                return BadRequest(new { message = "Already liked or prompt not found." });
            return Ok(new { message = "Prompt liked successfully." });
        }

        // GET: api/like/prompt/{promptId}/has
        [HttpGet("prompt/{promptId}/has")]
        public async Task<IActionResult> HasLikedPrompt(int promptId)
        {
            var userId = GetUserId();
            var liked = await _likeService.HasUserLikedPromptAsync(promptId, userId);
            return Ok(new { liked });
        }

        // POST: api/like/comment/{commentId}
        [HttpPost("comment/{commentId}")]
        public async Task<IActionResult> LikeComment(int commentId)
        {
            var userId = GetUserId();
            var created = await _likeService.LikeCommentAsync(commentId, userId);
            if (!created)
                return BadRequest(new { message = "Already liked or comment not found." });
            return Ok(new { message = "Comment liked successfully." });
        }

        // GET: api/like/comment/{commentId}/has
        [HttpGet("comment/{commentId}/has")]
        public async Task<IActionResult> HasLikedComment(int commentId)
        {
            var userId = GetUserId();
            var liked = await _likeService.HasUserLikedCommentAsync(commentId, userId);
            return Ok(new { liked });
        }

        // --- ASIL SIKINTI BURADA: GELİŞMİŞ CLAIM BULUCU ---
        private int GetUserId()
        {
            Console.WriteLine("DEBUG: JWT Claims dump:");
            foreach (var c in User.Claims)
                Console.WriteLine($" - {c.Type}: {c.Value}");

            // Birden çok claim adını sırayla dene
            var claim =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
                User.FindFirst("nameid")?.Value ??
                User.FindFirst("sub")?.Value ??
                User.FindFirst("id")?.Value ??
                User.FindFirst("userId")?.Value ??
                User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            Console.WriteLine($"DEBUG: Extracted userId claim value: {claim}");

            if (string.IsNullOrEmpty(claim) || !int.TryParse(claim, out var id))
                throw new UnauthorizedAccessException("Invalid user claim");
            return id;
        }
    }
}
