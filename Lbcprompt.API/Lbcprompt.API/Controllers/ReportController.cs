// Controllers/ReportController.cs

using Lbcprompt.API.DTOs;
using Lbcprompt.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] ReportDto dto)
        {
            var reporterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var result = await _reportService.CreateReportAsync(dto, reporterId);
            return Ok(result);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var reports = await _reportService.GetAllReportsAsync();
            return Ok(reports);
        }

        [HttpGet("hasReported/{promptId}")]
        [Authorize]
        public async Task<IActionResult> HasReported(int promptId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var reported = await _reportService.HasUserReportedPromptAsync(promptId, userId);
            return Ok(new { reported });
        }

    }
}

