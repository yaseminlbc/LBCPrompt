// Controllers/AdminController.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lbcprompt.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Role = u.Role
                })
                .ToListAsync();

            return Ok(users);
        }

        
        [HttpGet("prompts")]
        public async Task<IActionResult> GetAllPrompts()
        {
            var prompts = await _context.Prompts
                .Include(p => p.Author)
                .Include(p => p.Tags)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                   
                    Tags = p.Tags.Select(t => t.Name).ToList(),
                    p.IsApproved,
                    p.CreatedAt,
                    AuthorId = p.AuthorId,
                    AuthorUsername = p.Author.Username
                })
                .ToListAsync();

            return Ok(prompts);
        }

        
        [HttpPost("prompts/{id}/approve")]
        public async Task<IActionResult> ApprovePrompt(int id)
        {
            var prompt = await _context.Prompts.FindAsync(id);
            if (prompt == null)
                return NotFound(new { message = "Prompt bulunamadı." });

            prompt.IsApproved = true;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Prompt onaylandı." });
        }

        [HttpPost("prompts/{id}/reject")]
        public async Task<IActionResult> RejectPrompt(int id)
        {
            var prompt = await _context.Prompts.FindAsync(id);
            if (prompt == null)
                return NotFound(new { message = "Prompt bulunamadı." });

            prompt.IsApproved = false;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Prompt reddedildi." });
        }

        [HttpGet("reports")]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _context.Reports
                .Include(r => r.Prompt)
                .Include(r => r.Reporter)
                .Select(r => new
                {
                    r.Id,
                    r.Reason,
                    r.CreatedAt,
                    PromptId = r.PromptId,
                    PromptTitle = r.Prompt.Title,
                    ReporterId = r.ReporterId,
                    ReporterUsername = r.Reporter.Username
                })
                .ToListAsync();

            return Ok(reports);
        }

        
        [HttpDelete("reports/{id}/dismiss")]
        public async Task<IActionResult> DismissReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
                return NotFound(new { message = "Şikayet (report) bulunamadı." });

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Şikayet kaldırıldı." });
        }

       
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Kullanıcı silindi." });
        }
    }
}
